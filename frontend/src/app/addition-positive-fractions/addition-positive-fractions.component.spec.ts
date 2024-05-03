import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionPositiveFractionsComponent } from './addition-positive-fractions.component';

describe('AdditionPositiveFractionsComponent', () => {
  let component: AdditionPositiveFractionsComponent;
  let fixture: ComponentFixture<AdditionPositiveFractionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdditionPositiveFractionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdditionPositiveFractionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
