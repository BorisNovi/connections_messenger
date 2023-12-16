import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalService } from 'src/app/core/services/local.service';
import { ActivatedRoute } from '@angular/router';
import {
  Observable, Subscription, map, of
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { selectPeopleListItems } from 'src/app/NgRx/selectors/people-list.selector';
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
  private routeSubscription!: Subscription;
  messages$!: Observable<IGroupMessageItem[]>;

  constructor(
    private apiGroupChatService: ApiGroupChatService,
    private destroyRef: DestroyRef,
    private store: Store,
    private snackBar: MatSnackBar,
    private localService: LocalService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {}
  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.currentGroupId = params['groupID'];
    });
    this.getMessages();
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
    this.apiGroupChatService.sendGroupMessage(this.currentGroupId, 'I\'m a boss of a gay gym!').subscribe();
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Ok', { duration: this.delay });
  }
}
