import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ArrowRightComponent} from './arrow-right.component';

describe('ArrowRightComponent', () => {
  let component: ArrowRightComponent;
  let fixture: ComponentFixture<ArrowRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArrowRightComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrowRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
