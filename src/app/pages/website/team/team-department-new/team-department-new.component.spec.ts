import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDepartmentNewComponent } from './team-department-new.component';

describe('TeamDepartmentNewComponent', () => {
  let component: TeamDepartmentNewComponent;
  let fixture: ComponentFixture<TeamDepartmentNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamDepartmentNewComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDepartmentNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
