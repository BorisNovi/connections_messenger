import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CardComponent } from './components/card/card.component';
import { MainComponent } from './pages/main/main.component';
import { SearchResultsBlockComponent } from './components/search-results-block/search-results-block.component';
import { PublishedIndicatorDirective } from './directives/published-indicator.directive';
import { SearchPipe } from './pipes/search.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { CustomButtonComponent } from '../shared/components/custom-button/custom-button.component';
import { DetailComponent } from './pages/detail/detail.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'detail/:id', component: DetailComponent },
];

@NgModule({
  declarations: [
    MainComponent,
    SearchResultsBlockComponent,
    CardComponent,
    PublishedIndicatorDirective,
    SearchPipe,
    SortPipe,
    FilterPipe,
    DetailComponent,
  ],
  imports: [
    CommonModule,
    CustomButtonComponent,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
  ]

})
export class YoutubeModule { }
