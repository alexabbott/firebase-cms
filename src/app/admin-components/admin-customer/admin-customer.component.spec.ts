import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCustomerComponent } from './admin-customer.component';

describe('AdminCustomerComponent', () => {
  let component: AdminCustomerComponent;
  let fixture: ComponentFixture<AdminCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
