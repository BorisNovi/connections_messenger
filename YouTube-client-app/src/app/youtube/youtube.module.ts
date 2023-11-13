import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes, RouterLink } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CardComponent } from './components/card/card.component';
import { MainComponent } from './pages/main/main.component';
import { SearchResultsBlockComponent } from './components/search-results-block/search-results-block.component';
import { PublishedIndicatorDirective } from './directives/published-indicator.directive';
import { SearchPipe } from './pipes/search.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { CustomButtonComponent } from '../shared/components/custom-button/custom-button.component';
import { DetailComponent } from './pages/detail/detail.component';
import { SortingCriteriaBlockComponent } from './components/sorting-criteria-block/sorting-criteria-block.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { CreateCardFormComponent } from './components/create-card-form/create-card-form.component';

const MATERIAL_IMPORTS = [
  MatIconModule,
  MatButtonToggleModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
];

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: 'detail/:id', component: DetailComponent },
];

@NgModule({
  declarations: [
    MainComponent,
    SortingCriteriaBlockComponent,
    SearchResultsBlockComponent,
    CardComponent,
    PublishedIndicatorDirective,
    SearchPipe,
    SortPipe,
    FilterPipe,
    DetailComponent,
    AdminPageComponent,
    CreateCardFormComponent,
  ],
  imports: [
    CommonModule,
    CustomButtonComponent,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MATERIAL_IMPORTS,
  ]
})
export class YoutubeModule { }
