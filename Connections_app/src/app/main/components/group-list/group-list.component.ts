import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { setGroupListItems, deleteGroupListItem, setGroupListItem } from 'src/app/NgRx/actions/group-list.action';
import { selectGroupListItems } from 'src/app/NgRx/selectors/group-list.selector';
import {
  Observable, catchError, of, switchMap,
} from 'rxjs';
import { LocalService } from 'src/app/core/services/local.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ApiGroupListService } from '../../services/api-group-list.service';
import { IGroupItem } from '../../models/group-list-response.model';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { CreateFormDialogComponent } from '../create-form-dialog/create-form-dialog.component';
import { GroupCountdownService } from '../../services/group-countdown.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  isDeleteDisabled = false;
  isRefreshDisabled = false;
  groupList!: IGroupItem[];
  myUid = this.localService.getData('uid');
  countdown$!: Observable<number>;

  constructor(
    private apiGroupListService: ApiGroupListService,
    private destroyRef: DestroyRef,
    private store: Store,
    private notificationService: NotificationService,
    private localService: LocalService,
    private dialog: MatDialog,
    public countdown: GroupCountdownService
  ) {}

  ngOnInit(): void {
    this.getGroupList();
    this.countdown$ = this.countdown.getTimer();
    this.countdown$.subscribe((countdownValue) => {
      this.isRefreshDisabled = countdownValue !== 0;
    });
    this.isRefreshDisabled = false;
  }

  refreshGroupListTrigger(): void {
    this.countdown.reset();
    this.countdown.start().subscribe();

    this.refreshGroupList();
  }

  refreshGroupList(): void {
    this.apiGroupListService.getGroupList()
      .pipe(
        catchError((err) => {
          this.notificationService.openSnackBar(err.error.message || 'No Internet connection!');
          this.isRefreshDisabled = false;
          return of();
        }),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe((data) => {
        this.groupList = data.Items;
        this.notificationService.openSnackBar('Groups refreshed successfully!');
        this.store.dispatch(setGroupListItems({ groupItems: data.Items }));
      });
  }

  getGroupList(): void {
    this.isRefreshDisabled = true;
    this.store.select(selectGroupListItems)
      .pipe(
        switchMap((groupListItems) => (groupListItems[0]
          ? of({ Items: groupListItems })
          : this.apiGroupListService.getGroupList())),
        catchError((err) => {
          this.notificationService.openSnackBar(err.error.message || 'No Internet connection!');
          this.isRefreshDisabled = false;
          return of();
        }),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe((data) => {
        this.groupList = data.Items;
        this.store.dispatch(setGroupListItems({ groupItems: data.Items }));
      });
  }

  createGroup(value = ''): void {
    let groupNameFromDialog: string;
    this.openCreationDialog(value)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((groupName) => {
          groupNameFromDialog = groupName || '';
          if (groupName) {
            return this.apiGroupListService.createGroup(groupName)
              .pipe(
                catchError((err) => {
                  this.isDeleteDisabled = false;
                  this.notificationService.openSnackBar(err.error.message || 'No Internet connection!');
                  // Если запрос не успешен, откроем диалоговое окно снова со старым значением
                  this.createGroup(groupNameFromDialog);
                  return of();
                })
              );
          }
          return of();
        })
      )
      .subscribe((data) => {
        const stateData: IGroupItem = {
          createdAt: { S: new Date().getTime().toString() },
          id: { S: data.groupID },
          createdBy: { S: this.localService.getData('uid') || '' },
          name: { S: groupNameFromDialog },
        };
        this.notificationService.openSnackBar('Group created successfully!');
        this.store.dispatch(setGroupListItem({ groupItem: stateData }));
      });
  }

  deleteGroup(groupID: string): void {
    this.openConfirmationDialog()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((result) => {
          if (result) {
            this.isDeleteDisabled = true;
            return this.apiGroupListService.deleteGroup(groupID)
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
        this.notificationService.openSnackBar('Group deleted successfully!');
        this.store.dispatch(deleteGroupListItem({ groupID }));
      });
  }

  openCreationDialog(value = ''): Observable<string | undefined> {
    const dialogRef: MatDialogRef<CreateFormDialogComponent, string> = this.dialog
      .open(CreateFormDialogComponent, {
        data: { value },
      });
    return dialogRef.beforeClosed();
  }

  openConfirmationDialog(): Observable<boolean | undefined> {
    const dialogRef: MatDialogRef<DeleteConfirmationDialogComponent, boolean> = this.dialog
      .open(DeleteConfirmationDialogComponent);
    return dialogRef.afterClosed();
  }
}
