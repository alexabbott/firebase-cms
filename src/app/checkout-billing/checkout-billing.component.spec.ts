import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutBillingComponent } from './checkout-billing.component';

describe('CheckoutBillingComponent', () => {
  let component: CheckoutBillingComponent;
  let fixture: ComponentFixture<CheckoutBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
