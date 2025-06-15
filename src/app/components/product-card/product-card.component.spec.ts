import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardComponent } from './product-card.component';
import { CartService } from '../../services/cart.service';
import { of } from 'rxjs';
import { CartItem } from '../../../models/cartItem';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
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
      isItemInCart: jest.fn().mockReturnValue({ itemIndex: -1 }),
      addToCart: jest.fn(),
      updateCardItem: jest.fn(),
      deleteCartItem: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
      providers: [{ provide: CartService, useValue: mockCartService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.dessert = {
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

  it('should call addToCart with quantity 1', () => {
    component.onAddCardItem(1);
    expect(mockCartService.addToCart).toHaveBeenCalledWith(
      {
        name: 'Abochis Khebab',
        price: 2.5,
        image: 'thumbnail',
        quantity: 1,
      },
      'Abochis Khebab'
    );
  });

  it('should call updateCardItem with quantity > 1', () => {
    component.onAddCardItem(3);
    expect(mockCartService.updateCardItem).toHaveBeenCalledWith(
      'Abochis Khebab',
      3
    );
  });

  it('should call deleteCartItem when quantity is 0', () => {
    component.onAddCardItem(0);
    expect(mockCartService.deleteCartItem).toHaveBeenCalledWith(
      'Abochis Khebab'
    );
  });
});
