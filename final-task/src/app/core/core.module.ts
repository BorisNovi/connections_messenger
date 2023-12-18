import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ShellComponent } from './shell/shell.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    ShellComponent,
    NotFoundComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ]
})
export class CoreModule { }
