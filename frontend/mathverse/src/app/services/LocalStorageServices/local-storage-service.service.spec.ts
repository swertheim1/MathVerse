import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from './local-storage-service.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [LocalStorageService]
    });
    service = TestBed.inject(LocalStorageService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
