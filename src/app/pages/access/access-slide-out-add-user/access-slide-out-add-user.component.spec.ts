import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessSlideOutAddUserComponent } from './access-slide-out-add-user.component';

describe('AccessSlideOutAddUserComponent', () => {
  let component: AccessSlideOutAddUserComponent;
  let fixture: ComponentFixture<AccessSlideOutAddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessSlideOutAddUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessSlideOutAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
