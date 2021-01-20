import { Component, Input, OnInit } from '@angular/core';
import { TeamDepartment, TeamMember } from '../../../_api/team/team';
import { TeamService } from '../../../_api/team/team.service';

@Component({
  selector: 'admin-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: [ './team-member.component.scss' ]
})
export class TeamMemberComponent implements OnInit {

  @Input()
  member: TeamMember;
  department: TeamDepartment;

  constructor(
    private teamService: TeamService
  ) {
  }

  ngOnInit(): void {
    this.department = this.teamService.getDepartment(this.member.department_id); // TODO Update department name after department change
  }
}
