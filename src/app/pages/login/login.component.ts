import { Component } from '@angular/core';
import { NavigationService } from '../../_core/navigation/navigation.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'admin-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent {

  constructor(
    private readonly navigationService: NavigationService
  ) {
    this.navigationService.setTitle('Login');
    this.navigationService.updateVisibility(false);
    this.navigationService.showSlideout(undefined);
  }

  loginWithGithub(): void {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${environment.clientId}&redirect_uri=${window.location.protocol}//${window.location.host}/login/callback`;
  }
}
