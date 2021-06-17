import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMemberNewComponent } from './team-member-new.component';

describe('TeamMemberNewComponent', () => {
  let component: TeamMemberNewComponent;
  let fixture: ComponentFixture<TeamMemberNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamMemberNewComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMemberNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
