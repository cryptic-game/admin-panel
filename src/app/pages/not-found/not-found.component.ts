import { Component } from '@angular/core';
import { NavigationService } from '../../_core/navigation/navigation.service';

@Component({
  selector: 'admin-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: [ './not-found.component.scss' ]
})
export class NotFoundComponent {

  constructor(
    private readonly navigationService: NavigationService
  ) {
    this.navigationService.setTitle('Not Found');
    this.navigationService.updateVisibility(false);
    this.navigationService.showSlideOut(undefined);
  }
}
