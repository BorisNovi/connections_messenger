import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import {
  Observable, catchError, map, of, switchMap, take, tap,
} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalService } from 'src/app/core/services/local.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CountdownService } from 'src/app/core/services/countdown.service';
import { setPeopleListItems } from 'src/app/NgRx/actions/people-list.actions';
import { selectPeopleListItems } from 'src/app/NgRx/selectors/people-list.selector';
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
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getUsersList();
    this.countdown$ = this.countdown.getTimer();
    this.countdown$.subscribe((countdownValue) => {
      this.isRefreshDisabled = countdownValue !== 0;
    });
  }

  refreshPeopleList(): void {
    this.countdown.reset();
    this.countdown.start();

    if (!this.isRefreshDisabled) return;
    this.isRefreshDisabled = true;
    // this.apiGroupListService.getGroupList()
    //   .pipe(
    //     catchError((err) => {
    //       this.openSnackBar(err.error.message || 'No Internet connection!');
    //       this.isRefreshDisabled = false;
    //       return of();
    //     }),
    //     takeUntilDestroyed(this.destroyRef)
    //   ).subscribe((data) => {
    //     this.groupList = data.Items;
    //     this.openSnackBar('Groups refreshed successfully!');
    //     this.store.dispatch(setGroupListItems({ groupItems: data.Items }));
    //   });
  }

  public isHighlighted(uid: string): Observable<boolean> {
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
      ).subscribe((data) => {
        this.peopleList$ = of(data.Items);
        this.store.dispatch(setPeopleListItems({ peopleItems: data.Items }));
        this.isRefreshDisabled = false;
        this.cdr.markForCheck();
      });

    this.apiPeopleListService.getConversationList()
      .pipe(
        map((data) => data.Items)
      )
      .subscribe((data) => {
        this.conversationsList = data;
      });
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
