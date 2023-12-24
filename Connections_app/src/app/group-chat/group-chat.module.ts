import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ChatComponent } from './components/chat/chat.component';
import { AddNamePipe } from './pipes/add-name.pipe';
import { IsMineMessageDirective } from './directives/is-mine-message.directive';
import { DeleteConfirmationDialogMsgsComponent } from './components/delete-confirmation-dialog/delete-confirmation-dialog.component';

const routes: Routes = [
  { path: '', component: ChatComponent },
];

const MATERIAL_IMPORTS = [
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatListModule,
  MatDialogModule,
  MatToolbarModule
];

@NgModule({
  declarations: [
    ChatComponent,
    AddNamePipe,
    IsMineMessageDirective,
    DeleteConfirmationDialogMsgsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MATERIAL_IMPORTS
  ]
})
export class GroupChatModule { }
