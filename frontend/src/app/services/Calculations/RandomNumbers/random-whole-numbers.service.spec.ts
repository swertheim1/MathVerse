import { TestBed } from '@angular/core/testing';

import { RandomWholeNumbersService } from './random-whole-numbers.service';

describe('RandomWholeNumbersService', () => {
  let service: RandomWholeNumbersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomWholeNumbersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
