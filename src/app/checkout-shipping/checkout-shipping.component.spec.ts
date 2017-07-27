import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutShippingComponent } from './checkout-shipping.component';

describe('CheckoutShippingComponent', () => {
  let component: CheckoutShippingComponent;
  let fixture: ComponentFixture<CheckoutShippingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutShippingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
