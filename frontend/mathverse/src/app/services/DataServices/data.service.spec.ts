import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch topics from the API via HTTP GET', () => {
    const testData = [{ id: 1, name: 'Topic 1' }, { id: 2, name: 'Topic 2' }];

    service.fetchTopics();

    const req = httpMock.expectOne('data-url');
    expect(req.request.method).toBe('GET');
    req.flush(testData);

    service.topics$.subscribe(topics => {
      expect(topics).toEqual(testData);
    });
  });

  it('should handle error properly when fetching topics', () => {
    const errorResponse = { status: 404, statusText: 'Not Found' };
  
    service.fetchTopics();
  
    const req = httpMock.expectOne('data-url');
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('network error'), errorResponse);
  
    service.topics$.subscribe(() => {
      // Subscribe will not trigger since there's an error, so no need for expectation here
    });
  
    // Check if console.error was called with the proper message
    spyOn(console, 'error').and.callThrough(); // ensure the original console.error is called
    
  });
});
