import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDepartmentComponent } from './team-department.component';

describe('TeamDepartmentComponent', () => {
  let component: TeamDepartmentComponent;
  let fixture: ComponentFixture<TeamDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamDepartmentComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
