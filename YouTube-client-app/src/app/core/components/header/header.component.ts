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

  constructor(
    private dataSharingService: YoutubeHeaderDataSharingService,
    private loginService: LoginService
  ) {}

  isAuthorised = this.loginService.isAuthorised;

  username = this.loginService.username;

  toggleSort():void {
    this.isSortingOpen = !this.isSortingOpen;
    this.dataSharingService.updSortingOpenState(this.isSortingOpen);
  }

  onSearchTermChange(searchTerm: string): void {
    this.dataSharingService.updSearchTerm(searchTerm);
  }

  logOut(): void {
    this.loginService.logOut();
  }
}
