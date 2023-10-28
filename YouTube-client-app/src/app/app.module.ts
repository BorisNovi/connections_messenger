import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './youtube/components/header/header.component';
import { MainComponent } from './youtube/pages/main/main.component';
import { CardComponent } from './youtube/components/card/card.component';
import { SortingCriteriaBlockComponent } from './youtube/components/sorting-criteria-block/sorting-criteria-block.component';
import { SearchResultsBlockComponent } from './youtube/components/search-results-block/search-results-block.component';
import { SearchPipe } from './youtube/pipes/search.pipe';
import { PublishedIndicatorDirective } from './youtube/directives/published-indicator.directive';
import { CustomButtonComponent } from './youtube/components/custom-button/custom-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    CardComponent,
    SortingCriteriaBlockComponent,
    SearchResultsBlockComponent,
    SearchPipe,
    PublishedIndicatorDirective,
    CustomButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,

    // Material
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatButtonToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
