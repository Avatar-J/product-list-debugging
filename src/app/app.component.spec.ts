import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import desseretData from '../../public/data.json';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title as "Product list"', () => {
    expect(component.title).toBe('Product list');
  });

  it('should load desserts from JSON', () => {
    expect(component.desserts).toEqual(desseretData);
    expect(component.desserts?.length).toBeGreaterThan(0);
  });
});
