import { Component, OnInit } from '@angular/core';
import { LocalService } from '../services/local.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = this.localService.isAuthenticated;
  constructor(private localService: LocalService, public themeService: ThemeService) {}

  ngOnInit(): void {
    this.localService.updateAuthenticationStatus();
    // this.themeService.toggletheme();
  }
}
