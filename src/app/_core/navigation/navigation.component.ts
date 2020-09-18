import { Component, HostBinding } from '@angular/core';
import { NavigationService } from './navigation.service';

@Component({
  selector: 'admin-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: [ './navigation.component.scss' ]
})
export class NavigationComponent {

  title: string;

  @HostBinding('class.visible')
  visibility: boolean;

  @HostBinding('class.slideout')
  slideout: object;

  constructor(
    private readonly navigationService: NavigationService
  ) {
    this.navigationService.title.subscribe(value => this.title = value);
    this.navigationService.visibility.subscribe(value => this.visibility = value);
    this.navigationService.slideout.subscribe(value => this.slideout = value);
  }
}
