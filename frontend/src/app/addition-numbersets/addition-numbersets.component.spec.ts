import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdditionNumbersetsComponent } from './addition-numbersets.component';

describe('AdditionNumbersetsComponent', () => {
  let component: AdditionNumbersetsComponent;
  let fixture: ComponentFixture<AdditionNumbersetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdditionNumbersetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdditionNumbersetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
