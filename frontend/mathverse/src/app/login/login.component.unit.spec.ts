import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/AuthorizationServices/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { LoginFormModule } from '../forms/login-form/login-form.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let cookieService: CookieService;

  // Mock AuthService
  const authServiceMock = {
    login: jasmine.createSpy('login').and.returnValue(of(new HttpResponse({ status: 200 })))
  };

  // Mock CookieService
  const cookieServiceMock = {
    set: jasmine.createSpy('set')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LoginFormModule
      ],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: CookieService, useValue: cookieServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    cookieService = TestBed.inject(CookieService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should call AuthService.login on login', () => {
  //   component.login('test@test.com', 'password');
  //   expect(authService.login).toHaveBeenCalled();
  // });

  // it('should call CookieService.set on saveTokenToCookie', () => {
  //   component.saveTokenToCookie('token');
  //   expect(cookieService.set).toHaveBeenCalled();
  // });
});
