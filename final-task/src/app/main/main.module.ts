import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { MainComponent } from './pages/main/main.component';
import { DeleteConfirmationDialogComponent } from './components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { CreateFormDialogComponent } from './components/create-form-dialog/create-form-dialog.component';

const routes: Routes = [
  { path: '', component: MainComponent },
];

const MATERIAL_IMPORTS = [
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatListModule,
  MatDividerModule,
  MatSnackBarModule,
  MatDialogModule,
  MatToolbarModule
];

@NgModule({
  declarations: [
    MainComponent,
    GroupListComponent,
    PeopleListComponent,
    DeleteConfirmationDialogComponent,
    CreateFormDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    // FormsModule,
    ReactiveFormsModule,
    MATERIAL_IMPORTS
  ]
})
export class MainModule { }
