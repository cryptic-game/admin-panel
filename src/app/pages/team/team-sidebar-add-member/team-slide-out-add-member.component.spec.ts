import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSlideOutAddMemberComponent } from './team-slide-out-add-member.component';

describe('TeamSlideoutAddMemberComponent', () => {
  let component: TeamSlideOutAddMemberComponent;
  let fixture: ComponentFixture<TeamSlideOutAddMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamSlideOutAddMemberComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamSlideOutAddMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
