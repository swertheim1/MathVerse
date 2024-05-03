import { TestBed } from '@angular/core/testing';

import { RandomDecimalsService } from './random-decimals.service';

describe('RandomDecimalsService', () => {
  let service: RandomDecimalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomDecimalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
