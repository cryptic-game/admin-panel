import { Component } from '@angular/core';
import { NavigationService } from '../../_core/navigation/navigation.service';
import { User } from '../../_core/account/account';
import { AccountService } from '../../_core/account/account.service';

@Component({
  selector: 'admin-account',
  templateUrl: './account.component.html',
  styleUrls: [ './account.component.scss' ]
})
export class AccountComponent {

  get user(): User {
    return this.accountService.user;
  }

  constructor(
    private readonly navigationService: NavigationService,
    private readonly accountService: AccountService
  ) {
    this.navigationService.setTitle('Account');
    this.navigationService.updateVisibility(true);
    this.navigationService.showSlideOut(undefined);
  }
}
