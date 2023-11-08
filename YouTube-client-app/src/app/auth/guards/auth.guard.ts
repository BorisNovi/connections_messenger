import {
  ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot
} from '@angular/router';
import { Signal, inject } from '@angular/core';
import { ILoginCredentials } from '../models/login-credentials.model';
import { LoginService } from '../services/login.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const loginService = inject(LoginService);
  const credentials: Signal<ILoginCredentials> = loginService.currentLoginCredentials;
  if (credentials().login && credentials().password) {
    console.log(credentials());
    return true;
  }

  return router.parseUrl('/login');
};
