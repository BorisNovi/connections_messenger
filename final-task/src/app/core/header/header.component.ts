import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = this.localService.isAuthenticated;
  constructor(private localService: LocalService, private router: Router) {}

  ngOnInit(): void {
    this.localService.updateAuthenticationStatus();
  }

  signOut(): void {
    this.localService.clearData();
    this.router.navigate(['/signin']);
  }
}
