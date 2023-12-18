import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { LocalService } from 'src/app/core/services/local.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Observable, catchError, map, of, switchMap, take, tap
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { selectPeopleListItems } from 'src/app/NgRx/selectors/people-list.selector';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeopleLoaderService } from 'src/app/core/services/people-loader.service';
import { addGroupChatMessages, getGroupChatMessages } from 'src/app/NgRx/actions/group-chat.action';
import { selectMessagesByGroupID } from 'src/app/NgRx/selectors/group-chat.selector';
import { ApiCommonService } from 'src/app/core/services/api-common.service';
import { deleteGroupListItem } from 'src/app/NgRx/actions/group-list.action';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/core/services/notification.service';
import { IGroupMessageItem } from '../../models/group-chat-messages-response.model';
import { ApiGroupChatService } from '../../services/api-group-chat.service';
import { DeleteConfirmationDialogMsgsComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { GroupChatCountdownService } from '../../services/group-chat-countdown.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit {
  isRefreshDisabled = false;
  myUid = this.localService.getData('uid');
  createdBy = '';
  private currentGroupId = '';
  groupName = '';
  messages$!: Observable<IGroupMessageItem[]>;
  messageForm: FormGroup;
  lastMessageTime = 0;
  isDeleteDisabled = false;
  countdown$!: Observable<number>;

  constructor(
    private apiGroupChatService: ApiGroupChatService,
    private apiCommon: ApiCommonService,
    private peopleLoader: PeopleLoaderService,
    private destroyRef: DestroyRef,
    private store: Store,
    private notificationService: NotificationService,
    private localService: LocalService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private countdown: GroupChatCountdownService
  ) {
    this.messageForm = this.formBuilder.group({
      message: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentGroupId = params['groupID'];
    });

    this.route.queryParams.subscribe((params) => {
      this.createdBy = params['createdBy'];
      this.groupName = params['groupName'];
    });

    this.getMessages();
    this.checkNames();
    this.refreshIfLoaded();
    this.countdown$ = this.countdown.getTimer();
    this.countdown$.subscribe((countdownValue) => {
      this.isRefreshDisabled = countdownValue !== 0;
      this.cdr.markForCheck();
    });
    this.isRefreshDisabled = false;
  }

  refreshMessagesTrigger(): void {
    this.countdown.reset();
    this.countdown.start().subscribe();

    this.refreshMessages();
  }

  refreshIfLoaded(): void {
    this.store.select(selectMessagesByGroupID(this.currentGroupId))
      .pipe(
        take(1),
        tap((messages) => { if (messages.length) this.refreshMessages(); }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
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

  refreshMessages(): void {
    this.apiGroupChatService.getGroupMessages(this.currentGroupId, this.lastMessageTime)
      .pipe(
        catchError((err) => {
          this.notificationService.openSnackBar(err.error.message || 'No Internet connection!');
          this.isRefreshDisabled = false;
          return of();
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((messages) => {
        this.notificationService.openSnackBar('Messages updated successfully!');
        if (!messages.Items.length) return;
        this.store.dispatch(addGroupChatMessages({
          payload: { groupID: this.currentGroupId, messages: messages.Items }
        }));
      });
  }

  getMessages(): void {
    this.isRefreshDisabled = true;
    this.store.select(selectMessagesByGroupID(this.currentGroupId))
      .pipe(
        switchMap((messages) => (messages.length
          ? of({ Items: messages })
          : this.apiGroupChatService.getGroupMessages(this.currentGroupId))),
        catchError((err) => {
          this.notificationService.openSnackBar(err.error.message || 'No Internet connection!');
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
          this.notificationService.openSnackBar(err.error.message || 'No Internet connection!');
          return of();
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.messageForm.reset();
        this.notificationService.openSnackBar('Message sent!');
        this.refreshMessages();
      });
  }

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
                  this.notificationService.openSnackBar(err.error.message || 'No Internet connection!');
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
        this.notificationService.openSnackBar('Group deleted successfully!');
        this.store.dispatch(deleteGroupListItem({ groupID: this.currentGroupId }));
      });
  }

  openConfirmationDialog(): Observable<boolean | undefined> {
    const dialogRef: MatDialogRef<DeleteConfirmationDialogMsgsComponent, boolean> = this.dialog
      .open(DeleteConfirmationDialogMsgsComponent);
    return dialogRef.afterClosed();
  }
}
