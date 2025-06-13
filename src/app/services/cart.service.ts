import { Injectable } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  showModal: boolean = false;

  constructor() {}

  isItemInCart(name: string) {
    const currentItems = this.cartItemsSubject.getValue();
    const itemIndex = currentItems.findIndex((item) => item.name === name);
    return { itemIndex, currentItems };
  }

  updateQuantity(
    index: number,
    quantity: number,
    currentItems: CartItem[]
  ): void {
    currentItems[index].quantity = quantity;
    this.cartItemsSubject.next(currentItems);
  }

  addToCart(item: CartItem, name: string): void {
    const { itemIndex, currentItems } = this.isItemInCart(name);

    if (itemIndex !== -1) {
      this.updateQuantity(itemIndex, item.quantity, currentItems);
      return;
    }
    currentItems.push(item);
    this.cartItemsSubject.next(currentItems);
  }

  updateCardItem(name: string, quantity: number) {
    const { itemIndex, currentItems } = this.isItemInCart(name);
    if (itemIndex !== -1) {
      this.updateQuantity(itemIndex, quantity, currentItems);
    }
  }

  deleteCartItem(name: string) {
    const currentItems = this.cartItemsSubject.getValue();
    const updatedItems = currentItems.filter((item) => item.name !== name);
    console.log('updated list', updatedItems);
    this.cartItemsSubject.next(updatedItems);
  }

  calculateTotalItem(): number {
    const currentItems = this.cartItemsSubject.getValue();
    return currentItems.reduce((acc, item) => acc + item.quantity, 0);
  }

  calculateTotalPrice() {
    const currentItems = this.cartItemsSubject.getValue();
    return currentItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
  }

  showConfirmModalOrder() {
    this.showModal = true;
  }
}
