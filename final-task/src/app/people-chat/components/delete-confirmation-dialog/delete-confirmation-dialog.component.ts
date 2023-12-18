import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-dialog-people',
  template: `
  <h2 mat-dialog-title>Delete Confirmation</h2>
  <mat-dialog-content>
    Are you sure you want to delete this item?
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button mat-dialog-close>No</button>
    <button mat-button [mat-dialog-close]="true">Yes</button>
  </mat-dialog-actions>
`,
})
export class DeleteConfirmationDialogPeopleComponent {
  constructor(public dialogRef: MatDialogRef<DeleteConfirmationDialogPeopleComponent>) {}
}
