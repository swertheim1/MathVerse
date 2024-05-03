import { TestBed } from '@angular/core/testing';

import { RandomFractionsService } from './random-fractions.service';

describe('RandomFractionsService', () => {
  let service: RandomFractionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomFractionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
