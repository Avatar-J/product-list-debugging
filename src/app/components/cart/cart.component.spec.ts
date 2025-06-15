import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { CartService } from '../../services/cart.service';
import { of } from 'rxjs';
import { CartItem } from '../../../models/cartItem';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let mockCartService: Partial<CartService>;

  const mockItems: CartItem[] = [
    {
      name: 'Abochis Khebab',
      quantity: 2,
      price: 5.0,
      image: 'fatisTheCoder.jpg',
    },
    {
      name: 'Donut',
      quantity: 3,
      price: 2.5,
      image: 'mypetdog.jpg',
    },
  ];

  beforeEach(async () => {
    mockCartService = {
      cartItems$: of([]),
      calculateTotalItem: jest.fn(),
      calculateTotalPrice: jest.fn(),
      showConfirmModalOrder: jest.fn(),
      deleteCartItem: jest.fn(),
      showModal: false,
    } as any;

    await TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [{ provide: CartService, useValue: mockCartService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate cart items, total items, and total price on init', () => {
    mockCartService.cartItems$!.subscribe((items) => {
      expect(component.cartItems).toEqual(mockItems);
      expect(component.totalItems).toBe(5);
      expect(component.totalPrice).toBeCloseTo(17.5);
    });
  });

  it('should call deleteCartItem with correct item on delete', () => {
    component.onDeleteItem('Abochis Khebab');
    expect(mockCartService.deleteCartItem).toHaveBeenCalledWith(
      'Abochis Khebab'
    );
  });
});
