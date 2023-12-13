import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-form-dialog',
  template: `
  <h2 mat-dialog-title>Group Creation</h2>
    <form [formGroup]="createForm" (ngSubmit)="onSubmit()">
      <mat-dialog-content>
        <p>Are you sure you want to create a group?</p>
        <mat-form-field appearance="outline">
          <mat-label>Group Name</mat-label>
          <input matInput formControlName="groupName" />
          <mat-error *ngIf="createForm.controls['groupName'].errors?.['required']">Group Name is required</mat-error>
          <mat-error *ngIf="createForm.controls['groupName'].errors?.['maxlength']">Max length 30 characters</mat-error>
        </mat-form-field>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button mat-dialog-close>No</button>
        <button mat-button type="submit" [mat-dialog-close]="createForm.value.groupName" [disabled]="createForm.invalid">Yes</button>
      </mat-dialog-actions>
    </form>
    `
})
export class CreateFormDialogComponent {
  createForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateFormDialogComponent>,
    private formBuilder: FormBuilder
  ) {
    this.createForm = this.formBuilder.group({
      groupName: ['', [Validators.required, Validators.maxLength(30)]]
    });
  }

  onSubmit(): void {
    if (this.createForm.valid) {
      this.dialogRef.close(this.createForm.value.groupName);
    }
  }
}
