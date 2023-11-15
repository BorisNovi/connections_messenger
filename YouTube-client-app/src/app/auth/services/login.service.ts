import {
  Injectable, Signal, WritableSignal, computed, signal
} from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ILoginCredentials } from '../models/login-credentials.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginCredentials: WritableSignal<ILoginCredentials> = signal(
    { login: null, password: null }
  );
  currentLoginCredentials: Signal<ILoginCredentials> = computed(this.loginCredentials);

  private isAuthorisedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAuthorised = this.isAuthorisedSubject.asObservable();

  private usernameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('Unauthorized');
  username = this.usernameSubject.asObservable();

  constructor(
    private router: Router
  ) {}

  updLoginCredentials(newLoginCredentials: ILoginCredentials): void {
    this.loginCredentials.set(newLoginCredentials);
    this.logIn(this.loginCredentials());
  }

  logIn(credentials: ILoginCredentials): void {
    if (credentials.login && credentials.password) {
      this.saveFakeToken('token', true);
      this.isAuthorisedSubject.next(true);
      this.usernameSubject.next('Leeeroy Jenkins');
      this.router.navigate(['']);
    }
  }

  saveFakeToken(token: string, loggedIn: boolean): void {
    if (loggedIn) {
      localStorage.setItem('fakeToken', token);
    }
  }

  logOut() {
    this.updLoginCredentials({ login: null, password: null });
    this.isAuthorisedSubject.next(false);
    this.usernameSubject.next('Unauthorised');
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
