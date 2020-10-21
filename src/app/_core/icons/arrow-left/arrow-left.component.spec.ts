import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowLeftComponent } from './arrow-left.component';

describe('ArrowLeftComponent', () => {
  let component: ArrowLeftComponent;
  let fixture: ComponentFixture<ArrowLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrowLeftComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrowLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
