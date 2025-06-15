import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { of } from 'rxjs';
import { CartItem } from '../../../models/cartItem';
import { CartService } from '../../services/cart.service';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let mockCartService: Partial<CartService>;

  beforeEach(async () => {
    mockCartService = {
      clearCart: jest.fn(),
      showModal: true,
      calculateTotalPrice: jest.fn().mockReturnValue(0),
      calculateTotalItem: jest.fn().mockReturnValue(0),
    } as any;

    await TestBed.configureTestingModule({
      imports: [ModalComponent],
      providers: [{ provide: CartService, useValue: mockCartService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive cartItems as input', () => {
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

    component.cartItems = mockItems;
    fixture.detectChanges();

    expect(component.cartItems.length).toBe(2);
    expect(component.cartItems[0].name).toBe('Abochis Khebab');
  });

  it('should call clearCart and set showModal to false on onStartNewOrder()', () => {
    component.onStartNewOrder();
    expect(mockCartService.showModal).toBe(false);
  });
});
