import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public isDarkTheme = false;

  constructor(
    private localService: LocalService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.isDarkTheme = this.localService.getData('theme') === 'true';
    this.checkTheme();
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.localService.saveData('theme', this.isDarkTheme.toString());
    this.checkTheme();
  }

  private checkTheme() {
    const body = this.document.querySelector('body');

    if (body) {
      if (this.isDarkTheme) {
        body.classList.add('dark');
      } else {
        body.classList.remove('dark');
      }
    }
  }
}
