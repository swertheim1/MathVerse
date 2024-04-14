import { HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { CookieService } from "ngx-cookie-service";
import { of } from "rxjs";
import { AuthService } from "../services/AuthorizationServices/auth.service";
import { LoginComponent } from "./login.component";
import { ReactiveFormsModule } from "@angular/forms";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let cookieService: CookieService;
  let routerSpy: jasmine.SpyObj<Router>; // Define routerSpy as jasmine.SpyObj<Router>

  // Mock AuthService
  const authServiceMock = {
    login: jasmine.createSpy('login').and.returnValue(of(new HttpResponse({ status: 200 })))
  };

  // Mock CookieService
  const cookieServiceMock = {
    set: jasmine.createSpy('set')
  };

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']); // Create routerSpy here

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
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

    fixture.detectChanges(); // Trigger change detection to ensure ngOnInit is called
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthService.login on login', () => {
    
    component.login();
    fixture.detectChanges(); // Ensure change detection is triggered if needed
    expect(authService.login).toHaveBeenCalled();
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
    // Set up the login form with valid credentials
    // component.loginForm.setValue({ email: 'test@test.com', password: 'password' });
  
    // // Call the login method
    // console.log('before calling login method')
    // component.login();
    // console.log('after calling login method')
  
    // Arrange
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance;

    // Act - call the method that should trigger navigation
    component.login();
    // assert that the navigate method is called with ['/topics']
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/topics']);
  
    // Ensure that the login form is valid
    expect(component.loginForm.valid).toBe(true);
  
    // Expect that the Router.navigate method is called with the correct route
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/topics']); 
  });
  
  it('should navigate to signup page on forgotPasswordClick', () => {
    component.forgotPasswordClick();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/signup']); 
  });

});
