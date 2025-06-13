import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../../models/cartItem';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cartService = inject(CartService);
  cartItems: CartItem[] = [];
  totalItems: number = 0;
  totalPrice: number = 0;

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.totalItems = this.cartService.calculateTotalItem();
      this.totalPrice = this.cartService.calculateTotalPrice();
    });
  }

  onDeleteItem(item: string) {
    this.cartService.deleteCartItem(item);
  }
  onConfirmOrder() {
    this.cartService.showConfirmModalOrder();
    console.log(this.cartService.showModal);
  }
}
