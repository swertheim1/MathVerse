import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/AuthorizationServices/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let cookieService: CookieService;
  let router: Router;
  let fb: FormBuilder;

  const authServiceMock = {
    login: jasmine.createSpy('login').and.returnValue(of(new HttpResponse({ status: 200 })))
  };

  let cookieServiceSetSpy: jasmine.Spy;
  let routerNavigateSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        CookieService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    cookieService = TestBed.inject(CookieService);
    router = TestBed.inject(Router);
    fb = TestBed.inject(FormBuilder);

    // Initialize spies after services have been injected
    cookieServiceSetSpy = spyOn(cookieService, 'set');
    routerNavigateSpy = spyOn(router, 'navigate');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthService.login on login when form is valid', () => {
    // Arrange
    const email = 'test@example.com'; // Valid email
    const password = 'validPassword'; // Valid password

    // Set valid form value
    component.loginForm = fb.group({
      email: [email, Validators.required],
      password: [password, Validators.required],
    });

    // Act
    component.login(); // Call the login method

    // Assert
    expect(authServiceMock.login).toHaveBeenCalled();
  });

  it('should not call AuthService.login on login when form is invalid', () => {
    // Arrange
    const email = ''; // Invalid email
    const password = ''; // Invalid password

    // Initialize the login form with invalid values
    component.loginForm = fb.group({
      email: [email, Validators.required],
      password: [password, Validators.required],
    });

    // Act
    component.login(); // Call the login method

    // Assert
    expect(authServiceMock.login).not.toHaveBeenCalled();
  });

  it('should call CookieService.set on saveTokenToCookie', () => {
    component.saveTokenToCookie('token');
    expect(cookieServiceSetSpy).toHaveBeenCalled();
  });

  it('should call CookieService.set with correct arguments on saveTokenToCookie', () => {
    const token = 'token';
    component.saveTokenToCookie(token);
    expect(cookieServiceSetSpy).toHaveBeenCalledWith('authToken', token);
  });

  it('should navigate to topics page after successful login', () => {
    const email = 'test@example.com';
    const password = 'password';

    // Initialize the login form
    component.loginForm = fb.group({
      email: [email, Validators.required],
      password: [password, Validators.required]
    });

    // Simulate a successful login
    authServiceMock.login.and.returnValue(of(new HttpResponse({ status: 200 })));

    // Call the login method
    component.login();

    // Expect the router to navigate to topics page
    expect(routerNavigateSpy).toHaveBeenCalledWith(['/topics']);
  });
});
