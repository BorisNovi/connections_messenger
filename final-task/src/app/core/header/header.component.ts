import { Component, OnInit } from '@angular/core';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = this.localService.isAuthenticated;
  constructor(private localService: LocalService) {}

  ngOnInit(): void {
    this.localService.updateAuthenticationStatus();
  }
}
