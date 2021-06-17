import { Component } from '@angular/core';
import { TeamService } from '../../../../core/api/website/team/team.service';
import { TeamDepartment, TeamMember } from '../../../../core/api/website/team/team.domain';

@Component({
  selector: 'app-team-overview',
  templateUrl: './team-overview.component.html',
  styleUrls: ['./team-overview.component.scss']
})
export class TeamOverviewComponent {

  readonly displayedColumns = [ 'image', 'name', 'department', 'view' ];

  constructor(
    private readonly teamService: TeamService
  ) {
  }

  get member(): TeamMember[] {
    return this.teamService.members;
  }

  public getImage(githubId: number): string {
    return `https://avatars.githubusercontent.com/u/${githubId}?s=50`;
  }

  public getDepartment(id: string): TeamDepartment | undefined {
    return this.teamService.findDepartment(id);
  }

  trackBy(index: number, { id }: TeamMember): string {
    return id;
  }
}
