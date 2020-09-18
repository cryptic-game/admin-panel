import { Component, HostBinding } from '@angular/core';
import { NavigationService } from './navigation.service';

@Component({
  selector: 'admin-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: [ './navigation.component.scss' ]
})
export class NavigationComponent {

  @HostBinding('class.visible')
  visibility: boolean;

  constructor(
    private navigationService: NavigationService
  ) {
    this.navigationService.visibility.subscribe(value => this.visibility = value);
  }
}
