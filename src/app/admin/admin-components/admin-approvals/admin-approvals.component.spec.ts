import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApprovalsComponent } from './admin-approvals.component';

describe('AdminApprovalsComponent', () => {
  let component: AdminApprovalsComponent;
  let fixture: ComponentFixture<AdminApprovalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminApprovalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
