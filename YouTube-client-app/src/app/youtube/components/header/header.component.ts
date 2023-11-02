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

  @Output() allowRenderToMain = new EventEmitter<boolean>();

  @Output() sortDataToMain = new EventEmitter<ISort>();

  searchTerm = '';

  toggleSort():void {
    this.isSortingOpen = !this.isSortingOpen;
  }

  handleKeyPress(event?: KeyboardEvent): void {
    if (event?.code === 'KeyS') {
      this.toggleSort();
    }
  }

  performSearch(): void {
    this.searchTermToMain.emit(this.searchTerm);
    this.allowRenderToMain.emit(true);

    setTimeout(() => {
      this.allowRenderToMain.emit(false);
    }, 1);
  }

  receiveSortData(sortData: ISort) {
    this.sortDataToMain.emit(sortData);
  }
}
