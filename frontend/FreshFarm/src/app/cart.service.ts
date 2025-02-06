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
      cart.push({ ...product, quantity: 1 });
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
}
