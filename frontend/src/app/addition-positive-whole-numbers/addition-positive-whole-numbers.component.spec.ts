import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionPositiveWholeNumbersComponent } from './addition-positive-whole-numbers.component';

describe('AdditionPositiveWholeNumbersComponent', () => {
  let component: AdditionPositiveWholeNumbersComponent;
  let fixture: ComponentFixture<AdditionPositiveWholeNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdditionPositiveWholeNumbersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdditionPositiveWholeNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
