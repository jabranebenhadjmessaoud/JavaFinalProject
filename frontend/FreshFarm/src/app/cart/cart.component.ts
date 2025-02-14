import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { differenceInDays, differenceInMinutes, differenceInHours } from 'date-fns';
import Swal from 'sweetalert2';
import { Order } from '../order';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  imports: [CommonModule, NavbarComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  order_data: Order = {};
  productsList: any[] = [];
  cartItems: any[] = [];
  total: number = 0;
  errMessage: any = {};

  constructor(private cartService: CartService, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadCart();
    this.total = this.cartService.getCartTotal();
    // for(let i=0;i<this.cartItems.length;i++){
    // this.total= this.total + (parseFloat(this.cartItems[i].price)*parseInt(this.cartItems[i].quantity))
    // }
  }

  // create order 
  createOrder(): void {

    // for(let i in this.cartItems){

    // }


    this.order_data.orderProducts = this.cartItems;
    this.order_data.amount = this.total;
    console.log(this.order_data);
    this.apiService.createOrder(this.order_data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: err => this.errMessage = err
    });
    this.clearCart2();
    this.router.navigate(['/payment']);
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
    console.log(this.cartItems);
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.loadCart();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.loadCart();
    Swal.fire({
      title: 'You Cleared the cart!',
      text: `You cart is empty!.`,
      icon: 'success',
      showConfirmButton: false,
      timer: 2000, // Auto close in 2 seconds
      toast: true,
      position: 'top-end' // Appears at the top right
    });
  }
  clearCart2(): void {
    this.cartService.clearCart();
    this.loadCart();
  }
}