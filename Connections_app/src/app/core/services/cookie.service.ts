import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  constructor() { }

  public saveData(key: string, value: string, expirationDays = 1) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationDays);

    document.cookie = `${key}=${value};expires=${expirationDate.toUTCString()};path=/`;
  }

  public getData(key: string): string | null {
    const cookie = document.cookie.split(';').find((c) => c.trim().startsWith(`${key}=`));

    return cookie ? cookie.split('=')[1] : null;
  }

  public removeData(key: string) {
    document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  }

  public clearData() {
    document.cookie.split(';').forEach((cookie) => {
      const trimmedCookie = cookie.trim();
      const key = trimmedCookie.split('=')[0];
      this.removeData(key);
    });
  }
}
