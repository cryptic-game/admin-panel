import { Component } from '@angular/core';
import { NavigationService } from '../../_core/navigation/navigation.service';
import { TeamService } from '../../_api/team/team.service';
import { TeamDepartment, TeamMember } from '../../_api/team/team';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { TeamSlideoutAddMemberComponent } from './team-slideout-add-member/team-slideout-add-member.component';

@Component({
  selector: 'admin-team',
  templateUrl: './team.component.html',
  styleUrls: [ './team.component.scss' ]
})
export class TeamComponent {

  departmentFilter: FormControl;
  private departmentId: string;

  constructor(
    private readonly navigationService: NavigationService,
    private readonly teamService: TeamService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {
    this.navigationService.setTitle('Team');
    this.navigationService.updateVisibility(true);
    this.navigationService.showSlideout(TeamSlideoutAddMemberComponent);
    this.departmentFilter = new FormControl(this.departmentId || 'all');
    this.departmentFilter.valueChanges.subscribe(value => this.router.navigate([ 'team', value ]));
    this.activatedRoute.params.subscribe(value => {
      this.departmentId = value.departmentId;
      this.departmentFilter.setValue(this.departmentId, { emitEvent: false });
    });
  }

  get departments(): TeamDepartment[] {
    return this.teamService.departments;
  }

  get members(): TeamMember[] {
    return this.departmentId !== 'all'
      ? this.teamService.members?.filter(member => member.department_id === this.departmentId)
      : this.teamService.members;
  }

  trackBy(index: number, item: TeamDepartment | TeamMember): string {
    return item.id;
  }
}
