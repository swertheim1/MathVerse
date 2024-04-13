import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpRequest } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { TokenService } from './token.service';
import { AuthService } from '../AuthorizationServices/auth.service';

describe('TokenInterceptor', () => {
  let tokenService: TokenService;
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TokenService,
        AuthService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
        }
      ]
    });

    tokenService = TestBed.inject(TokenService);
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should add Authorization header with token if token exists', inject(
    [HttpClient, TokenService],
    (http: HttpClient, tokenService: TokenService) => {
      // Mock token existence
      spyOn(tokenService, 'getToken').and.returnValue('fakeToken');

      // Make a dummy HTTP request
      http.get('/api/data').subscribe(response => {
        expect(response).toBeTruthy();
      });

      // Verify the request
      const req = httpMock.expectOne('/api/data');
      expect(req.request.headers.has('Authorization')).toEqual(true);
      expect(req.request.headers.get('Authorization')).toEqual('Bearer fakeToken');

      req.flush({}); // Flush the response
    }
  ));

  it('should not add Authorization header if token does not exist', inject(
    [HttpClient, TokenService],
    (http: HttpClient, tokenService: TokenService) => {
      // Mock token non-existence
      spyOn(tokenService, 'getToken').and.returnValue(null as unknown as string); // Return null as string
  
      // Make a dummy HTTP request
      http.get('/api/data').subscribe(response => {
        expect(response).toBeTruthy();
      });
  
      // Verify the request
      const req = httpMock.expectOne('/api/data');
      expect(req.request.headers.has('Authorization')).toEqual(false); // Change expectation to false
  
      req.flush({}); // Flush the response
    }
  ));
  
  afterEach(() => {
    // After each test, verify that there are no outstanding requests
    httpMock.verify();
  });
});
