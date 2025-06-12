import {
  Component,
  EventEmitter,
  Output,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Dessert } from '../../../models/dessert';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.scss',
})
export class AddToCartComponent implements OnInit {
  @Input({ required: true })
  dessertItem!: Dessert;

  @Output()
  addCardItem = new EventEmitter<number>();

  cartService = inject(CartService);
  isAddedToCart = false;
  quantity = 1;

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe({
      next: (items) => {
        const { itemIndex } = this.cartService.isItemInCart(
          this.dessertItem.name
        );
        if (itemIndex === -1) {
          this.isAddedToCart = false;
          this.quantity = 1;
        }
      },
    });
  }

  addToCart() {
    this.isAddedToCart = true;
    this.addCardItem.emit(this.quantity);
  }

  decreaseProductItem() {
    if (this.quantity < 1) {
      this.isAddedToCart = false;
    }
    if (this.quantity >= 1) {
      this.quantity--;
    }
    this.addCardItem.emit(this.quantity);
    if (this.quantity === 0) {
      this.isAddedToCart = false;
      this.quantity = 1;
    }
  }

  increaseProductItem() {
    ++this.quantity;
    this.addCardItem.emit(this.quantity);
  }
}
