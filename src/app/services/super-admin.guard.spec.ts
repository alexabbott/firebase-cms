import { TestBed, async, inject } from '@angular/core/testing';

import { SuperAdminGuard } from './super-admin.guard';

describe('SuperAdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuperAdminGuard]
    });
  });

  it('should ...', inject([SuperAdminGuard], (guard: SuperAdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
