import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminThemeComponent } from './admin-theme.component';

describe('AdminThemeComponent', () => {
  let component: AdminThemeComponent;
  let fixture: ComponentFixture<AdminThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
