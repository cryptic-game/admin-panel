import {Component, Input, OnInit} from '@angular/core';
import {TeamDepartment, TeamMember} from '../../../_api/team/team';
import {TeamService} from '../../../_api/team/team.service';

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.scss'],
})
export class TeamMemberComponent implements OnInit {
  @Input()
  public member?: TeamMember;
  department?: TeamDepartment;

  constructor(private readonly teamService: TeamService) {
  }

  ngOnInit(): void {
    if (this.member) {
      this.department = this.teamService.getDepartment(
        this.member.department_id
      ); // TODO Update department name after department change
    }
  }
}
