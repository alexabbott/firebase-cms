import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenusComponent } from './admin-menus.component';

describe('AdminMenusComponent', () => {
  let component: AdminMenusComponent;
  let fixture: ComponentFixture<AdminMenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
