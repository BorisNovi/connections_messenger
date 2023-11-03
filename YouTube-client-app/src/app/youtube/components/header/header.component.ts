import { Component, Output, EventEmitter } from '@angular/core';
import { ISort } from '../../models/search/sort-params.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  isSortingOpen = false;

  @Output() searchTermToMain = new EventEmitter<string>();

  @Output() sortDataToMain = new EventEmitter<ISort>();

  searchTerm = '';

  toggleSort():void {
    this.isSortingOpen = !this.isSortingOpen;
  }

  handleKeyPress(event?: KeyboardEvent): void {
    if (event?.code === 'Enter') {
      this.toggleSort();
    }
  }

  performSearch(): void {
    this.searchTermToMain.emit(this.searchTerm);
  }

  receiveSortData(sortData: ISort): void {
    this.sortDataToMain.emit(sortData);
  }
}
