import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDialogComponent } from './approve-dialog.component';

describe('ApproveDialogComponent', () => {
  let component: ApproveDialogComponent;
  let fixture: ComponentFixture<ApproveDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
