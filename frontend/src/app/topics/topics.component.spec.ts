import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TopicsComponent } from './topics.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TokenService } from '../services/TokenServices/token.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('TopicsComponent', () => {
  let component: TopicsComponent;
  let fixture: ComponentFixture<TopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopicsComponent],
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule for HttpClient dependency
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: new Map().set('key', 'value') // Mock snapshot's paramMap if needed
            },
            queryParams: of({}) // Mock queryParams observable if needed
          }
        },
        // Provide a mock instance of TokenService
        {
          provide: TokenService,
          useValue: {
            getCachedTopics: () => ['Addition', 'Subtraction'] // Mock getCachedTopics method
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize properly', () => {
    expect(component.topics.length).toBe(2); // Check if topics array is properly initialized with 2 topics
    expect(component.topics[0]).toEqual('Addition'); // Check if the first topic is 'Addition'
    expect(component.topics[1]).toEqual('Subtraction'); // Check if the second topic is 'Subtraction'
    // Add more assertions if needed
  });

  // Other test cases...
});
