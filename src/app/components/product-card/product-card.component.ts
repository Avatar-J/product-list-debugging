import { Component, Input, inject, HostListener } from '@angular/core';
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
  mobileView: boolean = false;
  tabletView: boolean = false;

  @HostListener('window:resize', [])
  onResize(): void {
    this.updateDeviceType();
  }

  private updateDeviceType(): void {
    this.tabletView = window.innerWidth < 1200;
    this.mobileView = window.innerWidth < 768;
  }

  onAddCardItem(quantity: number) {
    if (quantity === 0) {
      this.cartService.deleteCartItem(this.dessert.name);
    } else if (quantity > 1) {
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

      this.cartService.addToCart(cartItem, this.dessert.name);
    }
  }
}
