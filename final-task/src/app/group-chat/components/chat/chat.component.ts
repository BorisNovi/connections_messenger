import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalService } from 'src/app/core/services/local.service';
import { ActivatedRoute } from '@angular/router';
import {
  Observable, Subscription, map, of, switchMap
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { selectPeopleListItems } from 'src/app/NgRx/selectors/people-list.selector';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeopleLoaderService } from 'src/app/core/services/people-loader.service';
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
    this.apiGroupChatService.getGroupMessages(this.currentGroupId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((messages) => {
        this.messages$ = of(messages.Items);
        this.cdr.markForCheck();
      });
  }

  sendTestm(): void {
    this.apiGroupChatService.sendGroupMessage(
      this.currentGroupId,
      this.messageForm.value.message
    )
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Ok', { duration: this.delay });
  }
}
