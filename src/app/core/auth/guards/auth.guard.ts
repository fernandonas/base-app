import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  if (!authService.isLogged()) {
    authService.onInvalidToken ();
    return false;
  }

  return true;
};
