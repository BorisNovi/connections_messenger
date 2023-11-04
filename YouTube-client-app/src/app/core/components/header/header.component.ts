import { Component, Output, EventEmitter } from '@angular/core';
import { ISort } from '../../../youtube/models/search/sort-params.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  isSortingOpen = false;

  @Output() searchTermToMain = new EventEmitter<string>();

  @Output() sortParamsToMain = new EventEmitter<ISort>();

  @Output() keywordToMain = new EventEmitter<string>();

  searchTerm = '';

  toggleSort():void {
    this.isSortingOpen = !this.isSortingOpen;
  }

  performSearch(): void {
    this.searchTermToMain.emit(this.searchTerm);
  }

  receiveSortParams(sortData: ISort): void {
    this.sortParamsToMain.emit(sortData);
  }

  receiveKeyword(keyword: string): void {
    this.keywordToMain.emit(keyword);
  }
}
