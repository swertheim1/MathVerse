import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { LoginFormModule } from '../forms/login-form/login-form.module';
import { AuthService } from '../services/AuthorizationServices/auth.service';
import { CookieService } from 'ngx-cookie-service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let cookieService: CookieService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        LoginFormModule
      ],
      providers: [
        AuthService,
        CookieService,
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    cookieService = TestBed.inject(CookieService)

    // Set up spies
    spyOn(authService, 'login').and.callThrough();
    spyOn(cookieService, 'set').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthService.login on login', () => {
    component.login('test@test.com', 'password');
    expect(authService.login).toHaveBeenCalled();
  });

  it('should call CookieService.set on saveTokenToCookie', () => {
    component.saveTokenToCookie('token');
    expect(cookieService.set).toHaveBeenCalled();
  });
});
