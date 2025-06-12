import { Component, Input, inject } from '@angular/core';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { Dessert } from '../../../models/dessert';
import { CartItem } from '../../../models/cartItem';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [AddToCartComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input({ required: true }) dessert!: Dessert;

  cartService = inject(CartService);

  onAddCardItem(quantity: number) {
    if (quantity === 0) {
      this.cartService.deleteCartItem(this.dessert.name);
    }
    if (quantity > 1) {
      this.cartService.updateCardItem(this.dessert.name, quantity);
    } else {
      const quantityNumber = quantity;
      const dessertName = this.dessert.name;
      const dessertPrice = this.dessert.price;
      const dessertImage = this.dessert.image.thumbnail;

      const cartItem: CartItem = {
        name: dessertName,
        price: dessertPrice,
        image: dessertImage,
        quantity: quantityNumber,
      };

      this.cartService.addToCart(cartItem);
    }
  }
}
