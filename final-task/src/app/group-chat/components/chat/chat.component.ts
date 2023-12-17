import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalService } from 'src/app/core/services/local.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Observable, Subscription, catchError, map, of, switchMap, take
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { selectPeopleListItems } from 'src/app/NgRx/selectors/people-list.selector';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeopleLoaderService } from 'src/app/core/services/people-loader.service';
import { addGroupChatMessage, addGroupChatMessages, getGroupChatMessages } from 'src/app/NgRx/actions/group-chat.action';
import { selectMessagesByGroupID } from 'src/app/NgRx/selectors/group-chat.selector';
import { ApiCommonService } from 'src/app/core/services/api-common.service';
import { deleteGroupListItem } from 'src/app/NgRx/actions/group-list.action';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IGroupMessageItem, IGroupMessagesResponse } from '../../models/group-chat-messages-response.model';
import { ApiGroupChatService } from '../../services/api-group-chat.service';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit {
  delay = 2000;
  isRefreshDisabled = false;
  myUid = this.localService.getData('uid');
  private currentGroupId = '';
  messages$!: Observable<IGroupMessageItem[]>;
  messageForm: FormGroup;
  lastMessageTime = 0;
  isDeleteDisabled = false;

  constructor(
    private apiGroupChatService: ApiGroupChatService,
    private apiCommon: ApiCommonService,
    private peopleLoader: PeopleLoaderService,
    private destroyRef: DestroyRef,
    private store: Store,
    private snackBar: MatSnackBar,
    private localService: LocalService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.messageForm = this.formBuilder.group({
      message: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentGroupId = params['groupID'];
    });
    this.getMessages();
    this.checkNames();
  }

  checkNames(): void {
    this.store.select(selectPeopleListItems)
      .pipe(
        map((people) => {
          if (people.length === 0) {
            this.peopleLoader.savePeopleList();
          }
          return of();
        })
      )
      .subscribe();
  }

  refreshMessages(): void { // Добавить обновление при повторном переходе
    this.apiGroupChatService.getGroupMessages(this.currentGroupId, this.lastMessageTime)
      .pipe(
        catchError((err) => {
          this.openSnackBar(err.error.message || 'No Internet connection!');
          this.isRefreshDisabled = false;
          return of();
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((messages) => {
        if (!messages.Items.length) return;
        this.store.dispatch(addGroupChatMessages({
          payload: { groupID: this.currentGroupId, messages: messages.Items }
        }));

        const sortedMessages = messages.Items
          .slice().sort((a, b) => b.createdAt.S.localeCompare(a.createdAt.S));

        this.lastMessageTime = +sortedMessages[0].createdAt.S;

        this.messages$ = of(sortedMessages);
        this.cdr.markForCheck();
      });
  }

  getMessages(): void { // Проверить правильность, уточнить, как сделать с since
    this.store.select(selectMessagesByGroupID(this.currentGroupId))
      .pipe(
        switchMap((messages) => (messages.length
          ? of({ Items: messages })
          : this.apiGroupChatService.getGroupMessages(this.currentGroupId))),
        catchError((err) => {
          this.openSnackBar(err.error.message || 'No Internet connection!');
          this.isRefreshDisabled = false;
          return of();
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((messages) => {
        if (!messages.Items.length) return;
        this.store.dispatch(getGroupChatMessages({
          groupChats: { [this.currentGroupId]: messages.Items }
        }));

        const sortedMessages = messages.Items
          .slice().sort((a, b) => b.createdAt.S.localeCompare(a.createdAt.S));

        this.lastMessageTime = +sortedMessages[0].createdAt.S;

        this.messages$ = of(sortedMessages);
        this.cdr.markForCheck();
      });
  }

  sendMessage(): void {
    this.apiGroupChatService.sendGroupMessage(
      this.currentGroupId,
      this.messageForm.value.message
    )
      .pipe(
        catchError((err) => {
          this.openSnackBar(err.error.message || 'No Internet connection!');
          return of();
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.store.dispatch(addGroupChatMessage({
          payload: {
            groupID: this.currentGroupId,
            message: {
              message: { S: this.messageForm.value.message },
              authorID: { S: this.myUid || '' },
              createdAt: { S: new Date().getTime().toString() }
            }
          }
        }));
        this.refreshMessages();
        this.messageForm.reset();
        this.openSnackBar('Message sent!');
      });
  }

  // Сделать удаление только своей. Пробрасывать id?
  deleteGroup(): void {
    this.openConfirmationDialog()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((result) => {
          if (result) {
            this.isDeleteDisabled = true;
            return this.apiCommon.deleteGroup(this.currentGroupId)
              .pipe(
                catchError((err) => {
                  this.isDeleteDisabled = false;
                  this.openSnackBar(err.error.message || 'No Internet connection!');
                  return of();
                })
              );
          }
          return of();
        })
      )
      .subscribe(() => {
        this.isDeleteDisabled = false;
        this.router.navigate(['/']);
        this.openSnackBar('Group deleted successfully!');
        this.store.dispatch(deleteGroupListItem({ groupID: this.currentGroupId }));
      });
  }

  openConfirmationDialog(): Observable<boolean | undefined> {
    const dialogRef: MatDialogRef<DeleteConfirmationDialogComponent, boolean> = this.dialog
      .open(DeleteConfirmationDialogComponent);
    return dialogRef.afterClosed();
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Ok', { duration: this.delay });
  }
}
