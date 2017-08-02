import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdminsComponent } from './admin-admins.component';

describe('AdminAdminsComponent', () => {
  let component: AdminAdminsComponent;
  let fixture: ComponentFixture<AdminAdminsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAdminsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
