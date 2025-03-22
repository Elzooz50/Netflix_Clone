import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';


export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);  // Inject the login service
  const router = inject(Router);  // Inject the Angular Router to handle navigation

  // Check if the user is logged in
  if (!loginService.ngOnInit) {  // If the user is not logged in (or a condition is false)
    return router.createUrlTree(["/login"]);  // Redirect to the login page
  } else {
    return true;  // Allow access to the route if the user is logged in
  }
};
