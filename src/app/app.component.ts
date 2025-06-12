import { Component } from '@angular/core';
import desseretData from '../../public/data.json';
import { Dessert } from '../models/dessert';
import { CartComponent } from './components/cart/cart.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ModalComponent } from './components/modal/modal.component';

@Component({
  selector: 'app-root',
  imports: [ProductCardComponent, CartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Product list';
  desserts: Dessert[] | null = null;

  constructor() {
    this.desserts = desseretData;
  }
}
