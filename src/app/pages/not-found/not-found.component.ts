import {Component} from '@angular/core';
import {NavigationService} from '../../_core/navigation/navigation.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

  constructor(
    private readonly navigationService: NavigationService
  ) {
    this.navigationService.init('Not Found', true);
    this.navigationService.showSlideOut(undefined);
  }
}
