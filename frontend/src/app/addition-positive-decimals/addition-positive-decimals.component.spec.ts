import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionPositiveDecimalsComponent } from './addition-positive-decimals.component';

describe('AdditionPositiveDecimalsComponent', () => {
  let component: AdditionPositiveDecimalsComponent;
  let fixture: ComponentFixture<AdditionPositiveDecimalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdditionPositiveDecimalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdditionPositiveDecimalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
