import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  isSortingOpen = false;

  @Output() searchTermToMain = new EventEmitter<string>();

  @Output() allowRenderToMain = new EventEmitter<boolean>();

  @Output() sortParamsToMain = new EventEmitter<string[]>();

  @Output() keywordToMain = new EventEmitter<string>();

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

  receiveSortParams(sortParams: (string)[]) {
    this.sortParamsToMain.emit(sortParams);
  }

  receiveKeyword(keyword: string) {
    this.keywordToMain.emit(keyword);
  }
}
