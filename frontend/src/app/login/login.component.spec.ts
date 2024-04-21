import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/AuthorizationServices/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let cookieService: CookieService;
  let router: Router;
  let fb: FormBuilder;

  let authServiceLoginSpy: jasmine.SpyObj<AuthService>;
  let cookieServiceSetSpy: jasmine.Spy;
  let routerNavigateSpy: jasmine.Spy;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
  
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        CookieService
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService); // No need to inject AuthService again
    cookieService = TestBed.inject(CookieService);
    router = TestBed.inject(Router);
    fb = TestBed.inject(FormBuilder);
  
    // Initialize loginForm
    component.loginForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  
    // Use authServiceSpy directly
    authServiceLoginSpy = authServiceSpy; // No need to inject and then assign again
    cookieServiceSetSpy = spyOn(cookieService, 'set').and.callThrough();
    routerNavigateSpy = spyOn(router, 'navigate');
  });
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Validation', () => {
    it('should call AuthService.login on login when form is valid', () => {
      // Arrange
      const email = 'test@example.com';
      const password = 'validPassword';
      component.loginForm.patchValue({ email, password });

      // Act
      component.login();

      // Assert
      expect(authServiceLoginSpy.login).toHaveBeenCalled();
    });

    it('should not call AuthService.login on login when form is invalid', fakeAsync(() => {
      // Act
      const form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('submit', null);
      tick();

      // Assert
      expect(authServiceLoginSpy.login).not.toHaveBeenCalled();
    }));
  });

  describe('Cookie Service Interaction', () => {
    it('should call CookieService.set on saveTokenToCookie', () => {
      // Act
      component.saveTokenToCookie('token');

      // Assert
      expect(cookieServiceSetSpy).toHaveBeenCalled();
    });

    it('should call CookieService.set with correct arguments on saveTokenToCookie', () => {
      // Arrange
      const token = 'token';

      // Act
      component.saveTokenToCookie(token);

      // Assert
      expect(cookieServiceSetSpy).toHaveBeenCalledWith('authToken', token);
    });
  });

  describe('Navigation', () => {
    it('should navigate to topics page after successful login', () => {
      // Arrange
      const email = 'test@example.com';
      const password = 'password';
      component.loginForm.patchValue({ email, password });

      // Act
      component.login();

      // Assert
      expect(routerNavigateSpy).toHaveBeenCalledWith(['/topics']);
    });
  });
});
