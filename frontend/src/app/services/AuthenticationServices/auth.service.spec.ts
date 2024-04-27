import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        AuthService, 
        
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that no requests are outstanding after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should use correct API URL', () => {
    // Arrange
    const expectedUrl = `${environment.apiUrl}/login`; // Assuming login is part of the API route

    // Act
    service.login({ email: 'test@example.com', password: 'password' }).subscribe(() => {
      // Assert
      const httpRequest = httpMock.expectOne(expectedUrl);
      expect(httpRequest.request.method).toEqual('POST');
      httpRequest.flush({}); // Mock response
    });

    // Ensure all HTTP requests are handled
    httpMock.verify();
  });


  it('should send a POST request when login is called', () => {
    const dummyCredentials = { email: 'test@example.com', password: 'password123' };
    const mockResponse = { token: 'mockToken' };

    service.login(dummyCredentials).subscribe(response => {
      expect(response.body).toEqual(mockResponse); // Assuming the response contains a token
    });

    const req = httpMock.expectOne('${environment.apiUrl}/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  // it('should send a GET request with proper authorization header when getHeaders is called', () => {
  //   const dummyToken = 'mockToken';
  //   const mockUserData = { /* mock user data */ };

  //   service.getHeaders(dummyToken).subscribe(response => {
  //     expect(response).toEqual(mockUserData); // Assuming the response contains user data
  //   });

  //   const req = httpMock.expectOne('${environment.apiUrl}/user-data');
  //   expect(req.request.method).toBe('GET');
  //   expect(req.request.headers.get('Authorization')).toBe(dummyToken);
  //   req.flush(mockUserData);
  // });
});
