import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TopicsComponent } from './topics.component';
import { AuthService } from '../services/AuthorizationServices/auth.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { TokenInterceptor } from '../services/TokenServices/token.interceptor';

describe('TopicsComponent', () => {
  let component: TopicsComponent;
  let fixture: ComponentFixture<TopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopicsComponent],
      imports: [HttpClientModule],
      providers: [
        AuthService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({})}
          }
        },
        {
          provide: HTTP_INTERCEPTORS, // Provide TokenInterceptor as HTTP_INTERCEPTORS
          useClass: TokenInterceptor, // Use the actual TokenInterceptor
          multi: true // Ensure it's a multi-provider
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
