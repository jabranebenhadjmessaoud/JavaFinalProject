import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // Check if userId is present in localStorage
    const userId = localStorage.getItem('user_id');

    if (userId) {
      // If userId exists, allow navigation
      return true;
    } else {
      // If userId doesn't exist, redirect to login page
      this.router.navigate(['/authenticate']);
      return false;
    }
  }
}
