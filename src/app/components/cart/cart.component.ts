import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../../models/cartItem';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cartService = inject(CartService);
  cartItems: CartItem[] = [];
  totalItems: number = 0;

  calculateTotalItem(): number {
    return this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.totalItems = this.calculateTotalItem();
    });
  }

  onDeleteItem(item: string) {
    this.cartService.deleteCartItem(item);
    this.totalItems = this.calculateTotalItem();
  }
}
