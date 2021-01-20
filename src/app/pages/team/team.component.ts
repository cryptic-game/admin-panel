import { Component } from '@angular/core';
import { NavigationService } from '../../_core/navigation/navigation.service';
import { TeamService } from '../../_api/team/team.service';
import { TeamDepartment, TeamMember } from '../../_api/team/team';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { TeamSlideOutAddMemberComponent } from './team-slide-out-add-member/team-slide-out-add-member.component';
import { TeamSlideOutEditMemberComponent } from './team-slide-out-edit-member/team-slide-out-edit-member.component';

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
    this.navigationService.init('Team');
    this.navigationService.showSlideOut(undefined);
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

  showAddMemberSlideOut(): void {
    this.navigationService.showSlideOut(TeamSlideOutAddMemberComponent);
  }

  showEditMemberSlideOut(member: TeamMember): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { edit: member.id },
        queryParamsHandling: 'merge'
      })
      .then(() => this.navigationService.showSlideOut(TeamSlideOutEditMemberComponent));
  }
}
