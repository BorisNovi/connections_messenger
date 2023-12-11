import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor() { }

  /* Вообще, данные стоило бы зашифровать перед помещением в локальное хранилище,
  поставив CryptoJS, но дополнительные либы запрещены, так что оставим так. */

  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
    this.updateAuthenticationStatus();
  }

  public getData(key: string) {
    return localStorage.getItem(key);
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
    this.updateAuthenticationStatus();
  }

  public clearData() {
    localStorage.clear();
    this.updateAuthenticationStatus();
  }

  public updateAuthenticationStatus() {
    let isAuthenticated = false;
    const isAuthenticatedCheck = this.getData('email')
    && this.getData('token')
    && this.getData('uid');

    if (isAuthenticatedCheck) {
      isAuthenticated = true;
    }
    this.isAuthenticatedSubject.next(isAuthenticated);
  }
}
