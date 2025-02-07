import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../user';
import { ApiService } from '../api.service';
import { CartService } from '../cart.service';
@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private apiService: ApiService, private router: Router, private cartService: CartService) { }
  userRole = localStorage.getItem('role');
  userId = localStorage.getItem('user_id');
  image = localStorage.getItem('image');
  user_stat = localStorage.getItem('user_stat');
  cartCount: number = 0;
  ngOnInit() {
    // Subscribe to cart count updates
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }
  cart = localStorage.getItem('cart');
  async logout(): Promise<void> {

    await localStorage.clear();
    this.router.navigate(['/authenticate']);
  }

}
