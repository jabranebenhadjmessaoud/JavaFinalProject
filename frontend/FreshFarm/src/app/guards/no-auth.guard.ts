import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const userId = localStorage.getItem('user_id');

    if (userId) {
      // Redirect logged-in users away from login/register pages
      this.router.navigate(['/']); // Change to your main page after login
      return false;
    }

    return true; // Allow access to login/register pages if user is NOT logged in
  }
}
