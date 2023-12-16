import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalService } from 'src/app/core/services/local.service';
import { ActivatedRoute } from '@angular/router';
import {
  Observable, Subscription, catchError, map, of, switchMap
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { selectPeopleListItems } from 'src/app/NgRx/selectors/people-list.selector';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeopleLoaderService } from 'src/app/core/services/people-loader.service';
import { addGroupChatMessage, getGroupChatMessages } from 'src/app/NgRx/actions/group-chat.action';
import { ApiGroupChatService } from '../../services/api-group-chat.service';
import { IGroupMessageItem, IGroupMessagesResponse } from '../../models/group-chat-messages-response.model';

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

  constructor(
    private apiGroupChatService: ApiGroupChatService,
    private peopleLoader: PeopleLoaderService,
    private destroyRef: DestroyRef,
    private store: Store,
    private snackBar: MatSnackBar,
    private localService: LocalService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder
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

  getMessages(): void {
    // сделать храниение как хэщ-таблицу из YouTube {GroupID: [{message1 }, {message 2}]}
    this.apiGroupChatService.getGroupMessages(this.currentGroupId)
      .pipe(
        catchError((err) => {
          this.openSnackBar(err.error.message || 'No Internet connection!');
          this.isRefreshDisabled = false;
          return of();
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((messages) => {
        messages.Items.sort((a, b) => b.createdAt.S.localeCompare(a.createdAt.S));
        this.messages$ = of(messages.Items);
        this.store.dispatch(getGroupChatMessages({
          groupChats: { [this.currentGroupId]: messages.Items }
        }));
        this.cdr.markForCheck();
      });
  }

  sendTestm(): void {
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
        this.messageForm.reset();
        this.openSnackBar('Message sent!');
      });
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Ok', { duration: this.delay });
  }
}
