import { TestBed, inject } from '@angular/core/testing';

import { LocalcartService } from './localcart.service';

describe('LocalcartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalcartService]
    });
  });

  it('should be created', inject([LocalcartService], (service: LocalcartService) => {
    expect(service).toBeTruthy();
  }));
});
