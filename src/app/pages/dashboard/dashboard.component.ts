import {Component} from '@angular/core';
import {NavigationService} from '../../_core/navigation/navigation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(
    private readonly navigationService: NavigationService
  ) {
    this.navigationService.init('Dashboard');
    this.navigationService.showSlideOut(undefined);
  }
}
