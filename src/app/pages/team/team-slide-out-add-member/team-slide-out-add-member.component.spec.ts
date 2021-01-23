import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TeamSlideoutAddMemberComponent} from './team-slide-out-add-member.component';

describe('TeamSlideoutAddMemberComponent', () => {
  let component: TeamSlideoutAddMemberComponent;
  let fixture: ComponentFixture<TeamSlideoutAddMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamSlideoutAddMemberComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamSlideoutAddMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
