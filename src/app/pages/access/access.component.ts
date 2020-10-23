import { Component } from '@angular/core';
import { NavigationService } from '../../_core/navigation/navigation.service';
import { AccessService } from '../../_api/access/access.service';
import { AdminUser } from '../../_api/access/access';

@Component({
  selector: 'admin-access',
  templateUrl: './access.component.html',
  styleUrls: [ './access.component.scss' ]
})
export class AccessComponent {

  constructor(
    private readonly navigationService: NavigationService,
    private readonly accessService: AccessService
  ) {
    this.navigationService.init('Access');
    this.navigationService.showSlideOut(undefined);
  }

  getGroupDisplay(user: AdminUser): string {
    return user.groups.map(group => this.accessService.getGroup(group).display_name).join(', ');
  }

  get users(): AdminUser[] {
    return this.accessService.users;
  }

  trackBy(index: number, item: AdminUser): number {
    return item.id;
  }

  delete(userId: number): void {
    this.accessService.deleteUser(userId).subscribe(console.log);
  }
}
