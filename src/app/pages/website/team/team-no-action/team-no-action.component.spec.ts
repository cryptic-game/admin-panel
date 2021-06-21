import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamNoActionComponent } from './team-no-action.component';

describe('TeamNoActionComponent', () => {
  let component: TeamNoActionComponent;
  let fixture: ComponentFixture<TeamNoActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamNoActionComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamNoActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
