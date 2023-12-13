import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { setGroupListItems, deleteGroupListItem } from 'src/app/NgRx/actions/group-list.action';
import { selectGroupListItems } from 'src/app/NgRx/selectors/group-list.selector';
import {
  Observable, catchError, of, switchMap
} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalService } from 'src/app/core/services/local.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiGroupListService } from '../../services/api-group-list.service';
import { IGroupItem, IGroupListResponse } from '../../models/group-list-response.model';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  delay = 2000;
  isDeleteDisabled = false;
  groupList!: IGroupItem[];
  myUid = this.localService.getData('uid');

  constructor(
    private apiGroupListService: ApiGroupListService,
    private destroyRef: DestroyRef,
    private store: Store,
    private snackBar: MatSnackBar,
    private localService: LocalService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getGroupList();
  }

  getGroupList(): void {
    this.store.select(selectGroupListItems)
      .pipe(
        switchMap((groupListItems) => (groupListItems[0]
          ? of({ Items: groupListItems })
          : this.apiGroupListService.getGroupList())),
        catchError((err) => {
          this.openSnackBar(err.error.message || 'No Internet connection!');
          return of();
        }),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe((data) => {
        this.groupList = data.Items;
        this.store.dispatch(setGroupListItems({ groupItems: data.Items }));
      });
  }

  testCreate() {
    this.apiGroupListService.createGroup('GAY LORD\'S GROUP')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(((data) => console.log(data)));
  }

  deleteGroup(groupID: string): void {
    this.openConfirmationDialog()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          this.isDeleteDisabled = true;
          this.apiGroupListService.deleteGroup(groupID)
            .pipe(
              catchError((err) => {
                this.isDeleteDisabled = false;
                this.openSnackBar(err.error.message || 'No Internet connection!');
                return of();
              }),
              takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(() => {
              this.isDeleteDisabled = false;
              this.openSnackBar('Group deleted successfully!');
              this.store.dispatch(deleteGroupListItem({ groupID }));
            });
        }
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
