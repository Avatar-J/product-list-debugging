import { Component, Input, inject } from '@angular/core';
import { CartItem } from '../../../models/cartItem';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() cartItems!: CartItem[];

  cartService = inject(CartService);

  onStartNewOrder() {
    this.cartService.clearCart();
    this.cartService.showModal = false;
  }
}
