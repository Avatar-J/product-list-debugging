import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCartComponent } from './add-to-cart.component';
import { CartItem } from '../../../models/cartItem';
import { Dessert } from '../../../models/dessert';
import { CartService } from '../../services/cart.service';
import { of } from 'rxjs';

describe('AddToCart', () => {
  let component: AddToCartComponent;
  let fixture: ComponentFixture<AddToCartComponent>;
  let mockCartService: Partial<CartService>;

  beforeEach(async () => {
    mockCartService = {
      cartItems$: of([]),
      isItemInCart: jest
        .fn()
        .mockReturnValue({ itemIndex: -1, currentItems: [] }),
    } as any;

    await TestBed.configureTestingModule({
      providers: [{ provide: CartService, useValue: mockCartService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddToCartComponent);
    component = fixture.componentInstance;
    component.dessertItem = {
      name: 'Abochis Khebab',
      price: 2.5,
      category: 'meat',
      image: {
        thumbnail: 'thumbnail',
        mobile: 'mobile',
        tablet: 'tablet',
        desktop: 'desktop',
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isAddedToCart to false and quantity to 1 on ngOnInit if item not in cart', () => {
    expect(component.isAddedToCart).toBe(false);
    expect(component.quantity).toBe(1);
  });

  it('should emit quantity when addToCart is called', () => {
    const spy = jest.spyOn(component.addCardItem, 'emit');
    component.quantity = 1;
    component.addToCart();
    expect(component.isAddedToCart).toBe(true);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should increase quantity and emit when increaseProductItem is called', () => {
    const spy = jest.spyOn(component.addCardItem, 'emit');
    component.quantity = 1;
    component.increaseProductItem();
    expect(component.quantity).toBe(2);
    expect(spy).toHaveBeenCalledWith(2);
  });

  it('should decrease quantity, emit, and reset if quantity is 0', () => {
    const spy = jest.spyOn(component.addCardItem, 'emit');
    component.quantity = 2;
    component.decreaseProductItem();
    expect(component.quantity).toBe(1);
    expect(component.isAddedToCart).toBe(false);
    expect(spy).toHaveBeenCalledWith(1);
  });
});
