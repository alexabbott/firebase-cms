import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdersComponent } from './admin-orders.component';

describe('AdminOrdersComponent', () => {
  let component: AdminOrdersComponent;
  let fixture: ComponentFixture<AdminOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
