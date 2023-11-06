import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { SortingCriteriaBlockComponent } from 'src/app/youtube/components/sorting-criteria-block/sorting-criteria-block.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ShellComponent } from './shell/shell.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SortingCriteriaBlockComponent,
    NotFoundComponent,
    ShellComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatButtonToggleModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    ShellComponent,
    SortingCriteriaBlockComponent,
  ]
})
export class CoreModule { }
