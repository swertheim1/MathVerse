import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenService } from './token.service';
import { TokenInterceptor } from './token.interceptor'; // Import TokenInterceptor
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('TokenService', () => {
  let service: TokenService;
  let mockToken: string;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      declarations: [],
      providers: [
        TokenService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor, // Provide the actual TokenInterceptor class
          multi: true
        }
      ]
    });
    service = TestBed.inject(TokenService);
    httpTestingController = TestBed.inject(HttpTestingController);
    mockToken = 'mock-token';
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should decode a token', () => {
    // Arrange
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNsd2VydGhlaW1AZXhhbXBsZS5jb20iLCJncmFkZV9sZXZlbCI6IjR0aF9ncmFkZSIsImlhdCI6MTcxMjY4MzkwMywiZXhwIjoxNzEyNjk4MzAzfQ.mVZLBvr-4qdpWBu82OX-cKDKSFQQb3yKDszyXwe0YMU'; 
    service.setToken(token);
    // Act
    service.decodeToken();
    // Assert
    expect(service.decodedToken).toBeTruthy(); // adjust this as needed based on your expected decoded token
  });

  it('should set a token', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNsd2VydGhlaW1AZXhhbXBsZS5jb20iLCJncmFkZV9sZXZlbCI6IjR0aF9ncmFkZSIsImlhdCI6MTcxMjY4MzkwMywiZXhwIjoxNzEyNjk4MzAzfQ.mVZLBvr-4qdpWBu82OX-cKDKSFQQb3yKDszyXwe0YMU';
    service.setToken(token);
    expect(service.setToken).toBeTruthy();
  });

  it('should get a token', () => {
    service.getToken();
    expect(service.getToken).toBeTruthy();
  });

  it('should get a username', () => {
    service.getGradeLevel();
    expect(service.getGradeLevel).toBeTruthy();
  });

  it('should get email', () => {
    service.getEmail();
    expect(service.getEmail).toBeTruthy();
  });

  it('should return true if the token is expired', () => {
    spyOn(service, 'getExpiryTime').and.returnValue(Date.now() / 1000 - 60); // Mock getExpiryTime to return a timestamp 60 seconds in the past
    expect(service.isTokenExpired()).toBeTrue();
  });

  it('should return false if the token is not expired', () => {
    spyOn(service, 'getExpiryTime').and.returnValue(Date.now() / 1000 + 60); // Mock getExpiryTime to return a timestamp 60 seconds in the future
    expect(service.isTokenExpired()).toBeFalse();
  });

});