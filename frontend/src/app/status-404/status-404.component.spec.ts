import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Status404Component } from './status-404.component';

describe('Status404Component', () => {
  let component: Status404Component;
  let fixture: ComponentFixture<Status404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Status404Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Status404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
