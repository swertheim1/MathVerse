import { HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { CookieService } from "ngx-cookie-service";
import { of } from "rxjs";
import { AuthService } from "../services/AuthorizationServices/auth.service";
import { LoginComponent } from "./login.component";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let cookieService: CookieService;
  let routerSpy: jasmine.SpyObj<Router>;

  const authServiceMock = {
    login: jasmine.createSpy('login').and.returnValue(of(new HttpResponse({ status: 200 })))
  };

  const cookieServiceMock = {
    set: jasmine.createSpy('set')
  };

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: CookieService, useValue: cookieServiceMock },
        { provide: Router, useValue: routerSpy }
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

  it('should call AuthService.login on login when form is valid', () => {
    const email = 'test@example.com';
    const password = 'password';

    component.loginForm.setValue({ email: email, password: password });

    component.login();

    expect(authServiceMock.login).toHaveBeenCalled();
  });

  it('should not call AuthService.login on login when form is invalid', () => {
    spyOn(component, 'login');
    component.loginForm.setValue({ email: '', password: '' });

    component.login();

    expect(authServiceMock.login).not.toHaveBeenCalled();
  });

  it('should call CookieService.set on saveTokenToCookie', () => {
    component.saveTokenToCookie('token');
    expect(cookieService.set).toHaveBeenCalled();
  });

  it('should call CookieService.set with correct arguments on saveTokenToCookie', () => {
    const token = 'token';
    component.saveTokenToCookie(token);
    expect(cookieService.set).toHaveBeenCalledWith('authToken', token);
  });

  it('should navigate to topics page after successful login', () => {
    const email = 'test@example.com';
    const password = 'password';

    // Initialize the login form
    component.loginForm = new FormBuilder().group({
      email: [email, Validators.required],
      password: [password, Validators.required]
    });

    // Simulate a successful login
    authServiceMock.login.and.returnValue(of(new HttpResponse({ status: 200 })));

    // Call the login method
    component.login();

    // Expect the router to navigate to topics page
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/topics']);
  });
});
