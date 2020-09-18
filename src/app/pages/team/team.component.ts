import { Component } from '@angular/core';
import { NavigationService } from '../../_core/navigation/navigation.service';
import { TeamService } from '../../_api/team/team.service';
import { TeamDepartment, TeamMember } from '../../_api/team/team';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'admin-team',
  templateUrl: './team.component.html',
  styleUrls: [ './team.component.scss' ]
})
export class TeamComponent {

  private departmentId: string;
  departmentFilter: FormControl;

  constructor(
    private navigationService: NavigationService,
    private teamService: TeamService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.navigationService.updateVisibility(true);
    this.departmentFilter = new FormControl(this.departmentId || '_');
    this.departmentFilter.valueChanges.subscribe(value => this.router.navigate(value === '_' ? [ 'team' ] : [ 'team', value ]));
    this.activatedRoute.params.subscribe(value => {
      this.departmentId = value.departmentId || '_';
      this.departmentFilter.setValue(this.departmentId, { emitEvent: false });
    });
  }

  get departments(): TeamDepartment[] {
    return this.teamService.departments;
  }

  get members(): TeamMember[] {
    return this.departmentId !== '_'
      ? this.teamService.members?.filter(member => member.department_id === this.departmentId)
      : this.teamService.members;
  }
}
