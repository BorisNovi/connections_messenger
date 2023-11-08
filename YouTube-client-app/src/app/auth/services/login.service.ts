import {
  Injectable, Signal, WritableSignal, computed, signal
} from '@angular/core';
import { Router } from '@angular/router';
import { ILoginCredentials } from '../models/login-credentials.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginCredentials: WritableSignal<ILoginCredentials> = signal(
    { login: null, password: null }
  );
  currentLoginCredentials: Signal<ILoginCredentials> = computed(this.loginCredentials);

  constructor(
    private router: Router
  ) {}

  updLoginCredentials(newLoginCredentials: ILoginCredentials): void {
    this.loginCredentials.set(newLoginCredentials);
    this.logIn(this.loginCredentials());
  }

  logIn(credentials: ILoginCredentials): void {
    if (credentials.login && credentials.password) {
      this.saveFakeToken(credentials, true);
    }
  }

  saveFakeToken(credentials: ILoginCredentials, loggedIn: boolean): void {
    if (loggedIn) {
      localStorage.setItem('fakeToken', JSON.stringify(credentials));
    }
  }

  logOut() {
    this.updLoginCredentials({ login: null, password: null });
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
