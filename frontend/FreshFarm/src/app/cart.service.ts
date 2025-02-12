import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface CartItem {
  product: any;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cart_items';
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor() {
    this.loadCartFromLocalStorage();
  }

  private loadCartFromLocalStorage() {
    const cart = this.getCart();
    this.cartCountSubject.next(cart.length);
  }

  getCart(): CartItem[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  addToCart(product: any): void {
    console.log('Product being added to cart:', product);
    if (!product || !product.id) {
      console.error('Product or product id is missing!');
      return;
    }

    let cart = this.getCart();
    const existingItemIndex = cart.findIndex(item => item.product.id === product.id);

    if (existingItemIndex > -1) {
      // Increment quantity if product already exists
      cart[existingItemIndex].quantity += 1;
    } else {
      // Add new product with quantity 1
      let productToAdd = { ...product };
      if (this.isOlderThanThreeDays(productToAdd.createdAt)) {
        productToAdd.price = productToAdd.price - (productToAdd.price / 100 * 20);
      }
      
      const newCartItem: CartItem = {
        product: productToAdd,
        quantity: 1
      };
      cart.push(newCartItem);
    }

    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.cartCountSubject.next(cart.length);
  }

  removeFromCart(productId: number): void {
    let cart = this.getCart();
    cart = cart.filter(item => item.product.id !== productId);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.cartCountSubject.next(cart.length);
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
    this.cartCountSubject.next(0);
  }

  // Update quantity for a specific product
  updateQuantity(productId: number, quantity: number): void {
    let cart = this.getCart();
    const itemIndex = cart.findIndex(item => item.product.id === productId);
    
    if (itemIndex > -1) {
      cart[itemIndex].quantity = quantity;
      if (quantity <= 0) {
        cart.splice(itemIndex, 1);
      }
      localStorage.setItem(this.cartKey, JSON.stringify(cart));
      this.cartCountSubject.next(cart.length);
    }
  }

  // Get total items count (sum of all quantities)
  getTotalItemsCount(): number {
    return this.getCart().reduce((total, item) => total + item.quantity, 0);
  }

  // Calculate cart total
  getCartTotal(): number {
    return this.getCart().reduce((total, item) => 
      total + (item.product.price * item.quantity), 0);
  }

  isOlderThanThreeDays(createdAt: string): boolean {
    const createdAtObj = new Date(createdAt);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - createdAtObj.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference > 3;
  }
}