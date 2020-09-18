import { Component } from '@angular/core';
import { NavigationService } from '../../_core/navigation/navigation.service';

@Component({
  selector: 'admin-account',
  templateUrl: './account.component.html',
  styleUrls: [ './account.component.scss' ]
})
export class AccountComponent {

  constructor(
    private navigationService: NavigationService
  ) {
    this.navigationService.updateVisibility(true);
  }
}
