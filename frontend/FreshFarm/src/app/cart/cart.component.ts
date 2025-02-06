import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { differenceInDays, differenceInMinutes, differenceInHours } from 'date-fns';


@Component({
  selector: 'app-cart',
  imports: [CommonModule,NavbarComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent  implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
    
  }

  isOlderThanThreeDays(createdAt: string): boolean {
    const createdAtObj = new Date(createdAt); // Parse the string into a Date object
    const currentDate = new Date(); // Get the current date
    const timeDifference = currentDate.getTime() - createdAtObj.getTime(); // Get the time difference in milliseconds
    const daysDifference = timeDifference / (1000 * 3600 * 24); // Convert to days

    return daysDifference > 3; // Return true if more than 3 days have passed
  }



  loadCart(): void {
    this.cartItems = this.cartService.getCart();
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.loadCart();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.loadCart();
  }
}