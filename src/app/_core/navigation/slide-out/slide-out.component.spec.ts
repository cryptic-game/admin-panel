import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideOutComponent } from './slide-out.component';

describe('SlideoutComponent', () => {
  let component: SlideOutComponent;
  let fixture: ComponentFixture<SlideOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideOutComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
