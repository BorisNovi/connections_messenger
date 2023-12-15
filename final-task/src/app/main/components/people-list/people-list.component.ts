import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import {
  Observable, catchError, forkJoin, map, of, switchMap, take, tap, zip,
} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalService } from 'src/app/core/services/local.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CountdownService } from 'src/app/core/services/countdown.service';
import { setConversationListItems, setFullPeopleItems, setPeopleListItems } from 'src/app/NgRx/actions/people-list.actions';
import { selectPeopleListItems } from 'src/app/NgRx/selectors/people-list.selector';
import { selectConversationListItems } from 'src/app/NgRx/selectors/conversation-list.selector';
import { Router } from '@angular/router';
import { CreateFormDialogComponent } from '../create-form-dialog/create-form-dialog.component';
import { ApiPeopleListService } from '../../services/api-people-list.service';
import { IConversationItem, IPeopleItem } from '../../models/people-list-response.model';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleListComponent implements OnInit {
  delay = 2000;
  isRefreshDisabled = false;
  peopleList$!: Observable<IPeopleItem[]>;
  conversationsList!: IConversationItem[];
  myUid = this.localService.getData('uid');
  countdown$!: Observable<number>;

  constructor(
    private apiPeopleListService: ApiPeopleListService,
    private destroyRef: DestroyRef,
    private store: Store,
    private snackBar: MatSnackBar,
    private localService: LocalService,
    private dialog: MatDialog,
    public countdown: CountdownService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsersList();
    this.countdown$ = this.countdown.getTimerT2();
    this.countdown$.subscribe((countdownValue) => {
      this.isRefreshDisabled = countdownValue !== 0;
      this.cdr.markForCheck();
    });
    this.isRefreshDisabled = false;
  }

  refreshPeopleList(): void {
    this.countdown.resetT2();
    this.countdown.startT2();

    this.isRefreshDisabled = true;
    forkJoin([
      this.apiPeopleListService.getUsersList(),
      this.apiPeopleListService.getConversationList()
    ])
      .pipe(
        catchError((err) => {
          this.openSnackBar(err.error.message || 'No Internet connection!');
          this.isRefreshDisabled = false;
          return of();
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(([peopleData, conversationData]) => {
        this.peopleList$ = of(peopleData.Items);
        this.conversationsList = conversationData.Items;
        this.openSnackBar('Users refreshed successfully!');
        this.store.dispatch(setFullPeopleItems({
          peopleItems: peopleData.Items,
          conversationItems: conversationData.Items
        }));
        this.cdr.markForCheck();
      });
  }

  public goToConversation(uid: string): void {
    const foundConversation = this.conversationsList
      .find((conversation) => conversation.companionID.S === uid);

    if (foundConversation) {
      this.router.navigate([`/conversation/${foundConversation.id.S}`]);
    } else {
      this.createConversation(uid).subscribe((conversationData) => {
        this.openSnackBar('UConversation created successfully!');
        this.router.navigate([`/conversation/${conversationData.conversationID}`]);
      });
    }
  }

  createConversation(companion: string): Observable<{ conversationID: string }> {
    return this.apiPeopleListService.createConversation(companion)
      .pipe(
        catchError((err) => {
          this.openSnackBar(err.error.message || 'No Internet connection!');
          this.isRefreshDisabled = false;
          return of();
        }),
        takeUntilDestroyed(this.destroyRef)
      );
  }

  public isHighlighted(uid: string): Observable<boolean> {
    // Переделать в директиву params conversation list и uid
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
          this.openSnackBar(err.error.message || 'No Internet connection!');
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
        switchMap((conversationListItems) => (conversationListItems[0]
          ? of({ Items: conversationListItems })
          : this.apiPeopleListService.getConversationList())),
        catchError((err) => {
          this.openSnackBar(err.error.message || 'No Internet connection!');
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

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Ok', { duration: this.delay });
  }
}
