import { CanActivateFn, Router } from '@angular/router';
import { Signal, inject } from '@angular/core';
import { ILoginCredentials } from '../models/login-credentials.model';
import { LoginService } from '../services/login.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const loginService = inject(LoginService);
  const credentials: Signal<ILoginCredentials> = loginService.currentLoginCredentials;
  if (credentials().login && credentials().password) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
