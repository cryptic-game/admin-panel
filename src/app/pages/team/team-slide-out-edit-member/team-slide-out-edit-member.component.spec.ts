import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSlideOutEditMemberComponent } from './team-slide-out-edit-member.component';

describe('TeamSlideOutEditMemberComponent', () => {
  let component: TeamSlideOutEditMemberComponent;
  let fixture: ComponentFixture<TeamSlideOutEditMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamSlideOutEditMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamSlideOutEditMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
