import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cart_items';

  constructor() {}

  // Get cart items from localStorage
  getCart(): any[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  // Add product to cart
  addToCart(product: any): void {
    console.log('Product being added to cart:', product); // Add this line
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
  }

  // Remove product from cart
  removeFromCart(productId: number): void {
    let cart = this.getCart();
    cart = cart.filter((item) => item.id !== productId);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  // Clear cart
  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }
}
