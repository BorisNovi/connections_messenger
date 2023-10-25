import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  isSortingOpen = false;

  @Output() searchTermTo = new EventEmitter<string>();

  @Output() allowRenderTo = new EventEmitter<boolean>();

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
    this.searchTermTo.emit(this.searchTerm);
    this.allowRenderTo.emit(true);

    setTimeout(() => {
      this.allowRenderTo.emit(false);
    }, 1);
  }
}
