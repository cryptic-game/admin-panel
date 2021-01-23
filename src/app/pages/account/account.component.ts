import {Component} from '@angular/core';
import {NavigationService} from '../../_core/navigation/navigation.service';
import {User} from '../../_core/account/account';
import {AccountService} from '../../_core/account/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {

  constructor(
    private readonly navigationService: NavigationService,
    private readonly accountService: AccountService
  ) {
    this.navigationService.init('Account');
    this.navigationService.showSlideOut(undefined);
  }

  get user(): User {
    return this.accountService.user;
  }
}
