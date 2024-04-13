import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { TokenService } from '../TokenServices/token.service';

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  let router: Router;
  let tokenServiceSpy: jasmine.SpyObj<TokenService>;

  beforeEach(() => {
    const tokenServiceSpyObj = jasmine.createSpyObj('TokenService', ['getToken', 'isTokenValid']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuardService,
        { provide: TokenService, useValue: tokenServiceSpyObj }
      ]
    });

    service = TestBed.inject(AuthGuardService);
    router = TestBed.inject(Router);
    tokenServiceSpy = TestBed.inject(TokenService) as jasmine.SpyObj<TokenService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should allow navigation if token is valid', () => {
    tokenServiceSpy.getToken.and.returnValue('valid-token');
    tokenServiceSpy.isTokenValid.and.returnValue(true);

    expect(service.canActivate()).toBeTrue();
  });

  it('should not allow navigation if token is invalid', () => {
    tokenServiceSpy.getToken.and.returnValue('invalid-token');
    tokenServiceSpy.isTokenValid.and.returnValue(false);

    const navigateSpy = spyOn(router, 'navigate');
    expect(service.canActivate()).toBeFalse();
    expect(navigateSpy).toHaveBeenCalledWith(['/login'], { queryParams: { message: 'Please log in to access topics.' } });
  });

  // Add more tests to cover other scenarios as needed
});
