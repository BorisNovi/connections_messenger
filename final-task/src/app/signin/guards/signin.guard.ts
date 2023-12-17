import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalService } from 'src/app/core/services/local.service';

export const signinGuard: CanActivateFn = () => {
  const router = inject(Router);
  const localService = inject(LocalService);
  const isAuthenticated = localService.getData('email')
  && localService.getData('token')
  && localService.getData('uid');

  if (isAuthenticated) {
    return true;
  }
  return router.createUrlTree(['/signin']);
};

export const sigedninGuard: CanActivateFn = () => {
  const router = inject(Router);
  const localService = inject(LocalService);
  const isAuthenticated = localService.getData('email')
  && localService.getData('token')
  && localService.getData('uid');

  if (!isAuthenticated) {
    return true;
  }
  return router.createUrlTree(['/']);
};
