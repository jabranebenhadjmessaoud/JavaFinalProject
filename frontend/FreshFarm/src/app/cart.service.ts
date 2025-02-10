import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cart_items';
  private cartCountSubject = new BehaviorSubject<number>(0); // Track cart count
  cartCount$ = this.cartCountSubject.asObservable(); // Expose as observable

  constructor() {
    this.loadCartFromLocalStorage();
  }

  private loadCartFromLocalStorage() {
    const cart = this.getCart();
    this.cartCountSubject.next(cart.length); // Initialize count
  }

  // Get cart items from localStorage
  getCart(): any[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  // Add product to cart
  addToCart(product: any): void {
    console.log('Product being added to cart:', product);
    if (!product || !product.id) {
      console.error('Product or product id is missing!');
      return;
    }

    let cart = this.getCart();
    const index = cart.findIndex((item) => item.id === product.id);

    if (index > -1) {
      cart[index].quantity += 1; // Increment quantity if already in cart
    } else {
      let p2={...product}
      if(this.isOlderThanThreeDays(p2.createdAt)){
        p2.price=p2.price - (p2.price / 100 * 20)
      }
      cart.push({ ...p2, quantity: 1 });
    }

    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.cartCountSubject.next(cart.length); // Update count
  }

  // Remove product from cart
  removeFromCart(productId: number): void {
    let cart = this.getCart();
    cart = cart.filter((item) => item.id !== productId);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.cartCountSubject.next(cart.length); // Update count
  }

  // Clear cart
  clearCart(): void {
    localStorage.removeItem(this.cartKey);
    this.cartCountSubject.next(0); // Reset count
  }
  
  


  isOlderThanThreeDays(createdAt: string): boolean {
    const createdAtObj = new Date(createdAt); // Parse the string into a Date object
    const currentDate = new Date(); // Get the current date
    const timeDifference = currentDate.getTime() - createdAtObj.getTime(); // Get the time difference in milliseconds
    const daysDifference = timeDifference / (1000 * 3600 * 24); // Convert to days

    return daysDifference > 3; // Return true if more than 3 days have passed
  }
}
