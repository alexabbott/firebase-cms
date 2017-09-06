import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductCategoriesComponent } from './admin-product-categories.component';

describe('AdminProductCategoriesComponent', () => {
  let component: AdminProductCategoriesComponent;
  let fixture: ComponentFixture<AdminProductCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProductCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
