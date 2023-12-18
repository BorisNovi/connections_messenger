import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonalChatComponent } from './components/personal-chat/personal-chat.component';
import { DeleteConfirmationDialogPeopleComponent } from './components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { AddNamePipe } from './pipes/add-name.pipe';
import { IsMineMessageDirective } from './directives/is-mine-message.directive';

const routes: Routes = [
  { path: '', component: PersonalChatComponent },
];

const MATERIAL_IMPORTS = [
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatListModule,
  MatSnackBarModule,
  MatDialogModule,
  MatToolbarModule
];

@NgModule({
  declarations: [
    PersonalChatComponent,
    DeleteConfirmationDialogPeopleComponent,
    AddNamePipe,
    IsMineMessageDirective
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MATERIAL_IMPORTS,
  ]
})
export class PeopleChatModule { }
