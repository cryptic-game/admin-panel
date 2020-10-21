import { Component } from '@angular/core';
import { NavigationService } from '../../_core/navigation/navigation.service';
import { TeamService } from '../../_api/team/team.service';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent {

  members: number;

  constructor(
    private readonly navigationService: NavigationService,
    private readonly teamService: TeamService
  ) {
    this.navigationService.init('Dashboard');
    this.navigationService.showSlideOut(undefined);
    this.members = this.teamService.members?.length;
  }
}
