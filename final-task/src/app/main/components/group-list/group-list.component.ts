import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { setGroupListItems, deleteGroupListItem, setGroupListItem } from 'src/app/NgRx/actions/group-list.action';
import { selectGroupListItems } from 'src/app/NgRx/selectors/group-list.selector';
import {
  Observable, catchError, of, switchMap
} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalService } from 'src/app/core/services/local.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiGroupListService } from '../../services/api-group-list.service';
import { IGroupItem } from '../../models/group-list-response.model';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { CreateFormDialogComponent } from '../create-form-dialog/create-form-dialog.component';

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

  createGroup() {
    let groupNameFromDialog: string;
    this.openCreationDialog()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((groupName) => {
          groupNameFromDialog = groupName || '';
          if (groupName) {
            return this.apiGroupListService.createGroup(groupName)
              .pipe(
                catchError((err) => {
                  this.isDeleteDisabled = false;
                  this.openSnackBar(err.error.message || 'No Internet connection!');
                  this.createGroup(); // Если запрос не успешен, откроем диалоговое окно снова
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
                  this.openSnackBar(err.error.message || 'No Internet connection!');
                  return of();
                })
              );
          }
          return of();
        })
      )
      .subscribe(() => {
        this.isDeleteDisabled = false;
        this.openSnackBar('Group deleted successfully!');
        this.store.dispatch(deleteGroupListItem({ groupID }));
      });
  }

  openCreationDialog(): Observable<string | undefined> {
    const dialogRef: MatDialogRef<CreateFormDialogComponent, string> = this.dialog
      .open(CreateFormDialogComponent);
    return dialogRef.beforeClosed();
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
