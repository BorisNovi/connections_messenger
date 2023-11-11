import { Component } from '@angular/core';
import { LoginService } from 'src/app/auth/services/login.service';
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
    private dataSharingService: YoutubeHeaderDataSharingService,
    private loginService: LoginService
  ) {}

  toggleSort():void {
    this.isSortingOpen = !this.isSortingOpen;
    this.dataSharingService.updSortingOpenState(this.isSortingOpen);
  }

  performSearch(): void {
    this.dataSharingService.updSearchTerm(this.searchTerm);
  }

  logOut(): void {
    this.loginService.logOut();
  }
}
