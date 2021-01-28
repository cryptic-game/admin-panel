import {Component, Input} from '@angular/core';
import {AccountService} from '../../account/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input()
  title?: string;

  // get user(): User {
  //   return this.accountService.user;
  // }

  constructor(
    private readonly accountService: AccountService
  ) {
  }

  logout(): void {
    this.accountService.logout();
  }
}
