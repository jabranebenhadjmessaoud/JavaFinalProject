import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // Retrieve userId and userRole from localStorage
    const userId = localStorage.getItem('user_id');
    const userRole = localStorage.getItem('role');  // Assuming the role is stored in localStorage

    if (userId && userRole === 'ROLE_ADMIN') {
      // If userId exists and the role is 'admin', allow navigation
      return true;
    } else {
      // If the user doesn't have an admin role, redirect to login or other page
      this.router.navigate(['/homepage']);
      return false;
    }
  }
}
