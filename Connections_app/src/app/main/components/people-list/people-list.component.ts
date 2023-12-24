import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import {
  Observable, catchError, forkJoin, map, of, switchMap,
} from 'rxjs';
import { LocalService } from 'src/app/core/services/local.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  addConversationListItem, setConversationListItems, setFullPeopleItems, setPeopleListItems
} from 'src/app/NgRx/actions/people-list.actions';
import { selectPeopleListItems } from 'src/app/NgRx/selectors/people-list.selector';
import { selectConversationListItems } from 'src/app/NgRx/selectors/conversation-list.selector';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CreateFormDialogComponent } from '../create-form-dialog/create-form-dialog.component';
import { ApiPeopleListService } from '../../services/api-people-list.service';
import { IConversationItem, IPeopleItem } from '../../models/people-list-response.model';
import { PeopleCountdownService } from '../../services/people-countdown.service';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleListComponent implements OnInit {
  isRefreshDisabled = false;
  peopleList$!: Observable<IPeopleItem[]>;
  conversationsList!: IConversationItem[];
  myUid = this.localService.getData('uid');
  countdown$!: Observable<number>;

  constructor(
    private apiPeopleListService: ApiPeopleListService,
    private destroyRef: DestroyRef,
    private store: Store,
    private notificationService: NotificationService,
    private localService: LocalService,
    private dialog: MatDialog,
    public countdown: PeopleCountdownService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsersList();
    this.countdown$ = this.countdown.getTimer();
    this.countdown$.subscribe((countdownValue) => {
      this.isRefreshDisabled = countdownValue !== 0;
      this.cdr.markForCheck();
    });
    this.isRefreshDisabled = false;
  }

  refreshPeopleList(): void {
    this.countdown.reset();
    this.countdown.start().subscribe();

    this.isRefreshDisabled = true;
    forkJoin([
      this.apiPeopleListService.getUsersList(),
      this.apiPeopleListService.getConversationList()
    ])
      .pipe(
        catchError((err) => {
          this.notificationService.openSnackBar(err.error.message || 'No Internet connection!');
          this.isRefreshDisabled = false;
          return of();
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(([peopleData, conversationData]) => {
        this.peopleList$ = of(peopleData.Items);
        this.conversationsList = conversationData.Items;
        this.notificationService.openSnackBar('Users refreshed successfully!');
        this.store.dispatch(setFullPeopleItems({
          peopleItems: peopleData.Items,
          conversationItems: conversationData.Items
        }));
        this.cdr.markForCheck();
      });
  }

  public goToConversation(uid: string, conversationName: string): void {
    const foundConversation = this.conversationsList
      ? this.conversationsList.find((conversation) => conversation.companionID.S === uid)
      : false;

    if (foundConversation) {
      this.router.navigate([`/conversation/${foundConversation.id.S}`], { queryParams: { conversationName } });
    } else {
      this.createConversation(uid).subscribe((conversationData) => {
        this.notificationService.openSnackBar('Conversation created successfully!');
        this.store.dispatch(addConversationListItem({
          conversationItem: {
            id: { S: conversationData.conversationID },
            companionID: { S: uid }
          }
        }));
        this.router.navigate([`/conversation/${conversationData.conversationID}`], { queryParams: { conversationName } });
      });
    }
  }

  createConversation(companion: string): Observable<{ conversationID: string }> {
    return this.apiPeopleListService.createConversation(companion)
      .pipe(
        catchError((err) => {
          this.notificationService.openSnackBar(err.error.message || 'No Internet connection!');
          this.isRefreshDisabled = false;
          return of();
        }),
        takeUntilDestroyed(this.destroyRef)
      );
  }

  public isHighlighted(uid: string): Observable<boolean> {
    if (!this.conversationsList) return of(false);
    return of(this.conversationsList).pipe(
      map((conversations) => conversations
        .some((conversation) => conversation.companionID.S === uid))
    );
  }

  getUsersList(): void {
    this.store.select(selectPeopleListItems)
      .pipe(
        switchMap((peopleListItems) => (peopleListItems[0]
          ? of({ Items: peopleListItems })
          : this.apiPeopleListService.getUsersList())),
        catchError((err) => {
          this.notificationService.openSnackBar(err.error.message || 'No Internet connection!');
          this.isRefreshDisabled = false;
          return of();
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(
        (peopleData) => {
          this.peopleList$ = of(peopleData.Items);
          this.store.dispatch(setPeopleListItems({ peopleItems: peopleData.Items }));
          this.cdr.markForCheck();
        }
      );

    this.store.select(selectConversationListItems)
      .pipe(
        switchMap((conversationListItems) => {
          if (conversationListItems.length) {
            return of({ Items: conversationListItems });
          }
          return this.apiPeopleListService.getConversationList()
            .pipe(
              switchMap((responsedItems) => {
                if (responsedItems.Items.length) {
                  return of(responsedItems);
                }
                return of();
              })
            );
        }),
        catchError((err) => {
          this.notificationService.openSnackBar(err.error.message || 'No Internet connection!');
          this.isRefreshDisabled = false;
          return of();
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(
        (conversationData) => {
          this.conversationsList = conversationData.Items;
          this.store.dispatch(setConversationListItems({
            conversationItems: conversationData.Items
          }));
        }
      );
  }

  openCreationDialog(): Observable<string | undefined> {
    const dialogRef: MatDialogRef<CreateFormDialogComponent, string> = this.dialog
      .open(CreateFormDialogComponent);
    return dialogRef.beforeClosed();
  }
}
