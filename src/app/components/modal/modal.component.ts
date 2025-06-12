import { Component, Input, inject } from '@angular/core';
import { CartItem } from '../../../models/cartItem';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() cartItems!: CartItem[];

  cartService = inject(CartService);

  onStartNewOrder() {
    this.cartService.showModal = false;
  }
}
