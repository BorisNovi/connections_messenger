import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit
} from '@angular/core';
import {
  Observable, catchError, map, of, switchMap, take, tap
} from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LocalService } from 'src/app/core/services/local.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { addPeopleChatMessages, getPeopleChatMessages } from 'src/app/NgRx/actions/people-chat.action';
import { selectMessagesByConversationID } from 'src/app/NgRx/selectors/people-chat.selector';
import { PeopleLoaderService } from 'src/app/core/services/people-loader.service';
import { selectPeopleListItems } from 'src/app/NgRx/selectors/people-list.selector';
import { deleteConversationListItem } from 'src/app/NgRx/actions/people-list.actions';
import { NotificationService } from 'src/app/core/services/notification.service';
import { PeopleChatCountdownService } from '../../services/people-chat-countdown.service';
import { ApiPeopleChatService } from '../../services/api-people-chat.service';
import { IPeopleMessageItem } from '../../models/people-chat-messages-response.model';
import { DeleteConfirmationDialogPeopleComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-personal-chat',
  templateUrl: './personal-chat.component.html',
  styleUrls: ['./personal-chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalChatComponent implements OnInit {
  isRefreshDisabled = false;
  myUid = this.localService.getData('uid');
  private currentConversationId = '';
  conversationName = '';
  messages$!: Observable<IPeopleMessageItem[]>;
  messageForm: FormGroup;
  lastMessageTime = 0;
  isDeleteDisabled = false;
  countdown$!: Observable<number>;

  constructor(
    private apiPeopleChatService: ApiPeopleChatService,
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
    private countdown: PeopleChatCountdownService
  ) {
    this.messageForm = this.formBuilder.group({
      message: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentConversationId = params['conversationID'];
    });

    this.route.queryParams.subscribe((params) => {
      this.conversationName = params['conversationName'];
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
    this.store.select(selectMessagesByConversationID(this.currentConversationId))
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
    this.apiPeopleChatService.getPeopleMessages(this.currentConversationId, this.lastMessageTime)
      .pipe(
        catchError((err) => {
          this.notificationService.openSnackBar(err.error.message || 'No Internet connection!');
          this.isRefreshDisabled = false;
          return of();
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((messages) => {
        if (!messages.Items.length) return;
        this.store.dispatch(addPeopleChatMessages({
          payload: { conversationID: this.currentConversationId, messages: messages.Items }
        }));
      });
  }

  getMessages(): void {
    this.isRefreshDisabled = true;
    this.store.select(selectMessagesByConversationID(this.currentConversationId))
      .pipe(
        switchMap((messages) => (messages.length
          ? of({ Items: messages })
          : this.apiPeopleChatService.getPeopleMessages(this.currentConversationId))),
        catchError((err) => {
          this.notificationService.openSnackBar(err.error.message || 'No Internet connection!');
          this.isRefreshDisabled = false;
          return of();
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((messages) => {
        if (!messages.Items.length) return;
        this.store.dispatch(getPeopleChatMessages({
          peopleChats: { [this.currentConversationId]: messages.Items }
        }));

        const sortedMessages = messages.Items
          .slice().sort((a, b) => b.createdAt.S.localeCompare(a.createdAt.S));

        this.lastMessageTime = +sortedMessages[0].createdAt.S;

        this.messages$ = of(sortedMessages);
        this.cdr.markForCheck();
      });
  }

  sendMessage(): void {
    this.apiPeopleChatService.sendPeopleMessage(
      this.currentConversationId,
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

  deleteConversation(): void {
    this.openConfirmationDialog()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((result) => {
          if (result) {
            this.isDeleteDisabled = true;
            return this.apiPeopleChatService.deleteConversation(this.currentConversationId)
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
        this.notificationService.openSnackBar('Conversation deleted successfully!');
        this.store.dispatch(deleteConversationListItem({
          conversationID: this.currentConversationId
        }));
      });
  }

  openConfirmationDialog(): Observable<boolean | undefined> {
    const dialogRef: MatDialogRef<DeleteConfirmationDialogPeopleComponent, boolean> = this.dialog
      .open(DeleteConfirmationDialogPeopleComponent);
    return dialogRef.afterClosed();
  }
}
