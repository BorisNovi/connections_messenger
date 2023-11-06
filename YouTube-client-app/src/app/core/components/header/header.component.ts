import { Component } from '@angular/core';
import { YoutubeHeaderDataSharingService } from 'src/app/youtube/services/youtube-header-data-sharing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  isSortingOpen = false;

  searchTerm = '';

  constructor(
    private dataSharingService: YoutubeHeaderDataSharingService
  ) {}

  toggleSort():void {
    this.isSortingOpen = !this.isSortingOpen;
  }

  performSearch(): void {
    this.dataSharingService.updSearchTerm(this.searchTerm);
  }
}
