import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './youtube/components/header/header.component';
import { MainComponent } from './youtube/pages/main/main.component';
import { CardComponent } from './youtube/components/card/card.component';
import { FilteringCriteriaBlockComponent } from './youtube/components/filtering-criteria-block/filtering-criteria-block.component';
import { SearchResultsBlockComponent } from './youtube/components/search-results-block/search-results-block.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    CardComponent,
    FilteringCriteriaBlockComponent,
    SearchResultsBlockComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

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
