import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberSetsComponent } from './number-sets.component';
import { NumberSetsModule } from './number-sets.module';

describe('NumberSetsComponent', () => {
  let component: NumberSetsComponent;
  let fixture: ComponentFixture<NumberSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NumberSetsModule,
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NumberSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
