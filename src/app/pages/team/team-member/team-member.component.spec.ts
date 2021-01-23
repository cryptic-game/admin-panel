import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {TeamMemberComponent} from './team-member.component';

describe('TeamMemberComponent', () => {
  let component: TeamMemberComponent;
  let fixture: ComponentFixture<TeamMemberComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TeamMemberComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
