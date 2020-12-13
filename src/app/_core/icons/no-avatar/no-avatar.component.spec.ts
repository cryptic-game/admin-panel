import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAvatarComponent } from './no-avatar.component';

describe('NoAvatarComponent', () => {
  let component: NoAvatarComponent;
  let fixture: ComponentFixture<NoAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoAvatarComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
