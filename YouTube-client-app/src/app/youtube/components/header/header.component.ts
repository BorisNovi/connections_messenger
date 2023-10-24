import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  isSortingOpen = false;

  toggleSort():void {
    this.isSortingOpen = !this.isSortingOpen;
  }

  handleKeyPress(event?: KeyboardEvent): void {
    if (event?.code === 'KeyS') {
      this.toggleSort();
    }
  }
}
