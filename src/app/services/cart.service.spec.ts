import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { CartItem } from '../../models/cartItem';

describe('CartService', () => {
  let service: CartService;

  const mockItem: CartItem = {
    name: 'Abochis Khebab',
    quantity: 2,
    price: 5.0,
    image: 'fatisTheCoder.jpg',
  };

  const mockItem2: CartItem = {
    name: 'Donut',
    quantity: 3,
    price: 2.5,
    image: 'mypetdog.jpg',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an item to the cart', () => {
    service.addToCart(mockItem, mockItem.name);

    service.cartItems$.subscribe((items) => {
      expect(items.length).toBe(1);
      expect(items[0].name).toBe('Abochis Khebab');
      expect(items[0].quantity).toBe(2);
    });
  });

  it('should add an item to the cart if new', () => {
    service.addToCart(mockItem2, mockItem2.name);

    service.cartItems$.subscribe((items) => {
      expect(items.length).toBe(2);
    });
  });

  it('should update quantity if item already exists in cart', () => {
    const spyUpdateQuantity = jest.spyOn(service, 'updateQuantity');
    const spyIsItemInCart = jest.spyOn(service, 'isItemInCart');
    const updatedItem = { ...mockItem, quantity: 5 };

    service.addToCart(updatedItem, updatedItem.name);

    service.cartItems$.subscribe((items) => {
      expect(items[0].quantity).toBe(5);
      expect(spyUpdateQuantity).toHaveBeenCalledTimes(1);
      expect(spyIsItemInCart).toHaveBeenCalledTimes(1);
    });
  });

  it('should update quantity using updateCardItem()', () => {
    const spyUpdateQuantity = jest.spyOn(service, 'updateQuantity');
    const spyIsItemInCart = jest.spyOn(service, 'isItemInCart');
    service.updateCardItem(mockItem.name, 8);

    service.cartItems$.subscribe((items) => {
      expect(items[0].quantity).toBe(8);
      expect(spyUpdateQuantity).toHaveBeenCalledTimes(1);
      expect(spyIsItemInCart).toHaveBeenCalledTimes(1);
    });
  });

  it('should delete item from cart', () => {
    service.addToCart(mockItem, mockItem.name);
    service.deleteCartItem(mockItem.name);

    service.cartItems$.subscribe((items) => {
      expect(items.length).toBe(0);
    });
  });

  it('should calculate total items correctly', () => {
    service.addToCart(mockItem, mockItem.name);
    service.addToCart(mockItem2, mockItem2.name);

    const totalItems = service.calculateTotalItem();
    expect(totalItems).toBe(5);
  });

  it('should calculate total price correctly', () => {
    service.addToCart(mockItem, mockItem.name);
    service.addToCart(mockItem2, mockItem2.name);

    const totalPrice = service.calculateTotalPrice();
    expect(totalPrice).toBeCloseTo(5.0 * 2 + 2.5 * 3);
  });

  it('should show confirm modal when called', () => {
    service.showConfirmModalOrder();
    expect(service.showModal).toBeTruthy();
  });
});
