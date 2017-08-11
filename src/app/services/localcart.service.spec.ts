import { TestBed, inject } from '@angular/core/testing';

import { LocalCartService } from './localcart.service';

describe('LocalCartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalCartService]
    });
  });

  it('should be created', inject([LocalCartService], (service: LocalCartService) => {
    expect(service).toBeTruthy();
  }));
});
