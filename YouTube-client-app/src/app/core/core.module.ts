import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { SortingCriteriaBlockComponent } from 'src/app/youtube/components/sorting-criteria-block/sorting-criteria-block.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    SortingCriteriaBlockComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatButtonToggleModule,
    FormsModule,
  ],
  exports: [
    HeaderComponent,
  ]
})
export class CoreModule { }
