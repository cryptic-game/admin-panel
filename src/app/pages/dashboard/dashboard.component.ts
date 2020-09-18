import { Component } from '@angular/core';
import { NavigationService } from '../../_core/navigation/navigation.service';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent {

  constructor(
    private navigationService: NavigationService
  ) {
    this.navigationService.updateVisibility(true);
  }
}
