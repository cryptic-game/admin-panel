import { Component } from '@angular/core';
import { NavigationService } from '../../_core/navigation/navigation.service';
import { AccessService } from '../../_api/access/access.service';
import { AdminUser } from '../../_api/access/access';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../../_core/notification/notification.service';

@Component({
  selector: 'admin-access',
  templateUrl: './access.component.html',
  styleUrls: [ './access.component.scss' ]
})
export class AccessComponent {

  constructor(
    private readonly navigationService: NavigationService,
    private readonly accessService: AccessService,
    private readonly notificationService: NotificationService
  ) {
    this.navigationService.init('Access');
    this.navigationService.showSlideOut(undefined);
  }

  get users(): AdminUser[] {
    return this.accessService.users;
  }

  getGroupDisplay(user: AdminUser): string {
    return user.groups.map(group => this.accessService.getGroup(group).display_name).join(', ');
  }

  trackBy(index: number, item: AdminUser): number {
    return item.id;
  }

  delete(userId: number): void {
    this.accessService.deleteUser(userId)
      .pipe(catchError(error => {
        if (error === 'CANNOT_DELETE_OWN_USER') {
          this.notificationService.sendNotification('You cannot delete yourself.', 'error');
        } else if (error) {
          this.notificationService.sendNotification(`Unable to delete user: ${error}`, 'error');
        } else {
          this.notificationService.sendNotification('Something went wrong. Please take a look into the console and report this error or try again later.', 'error');
        }
        throw error;
      }))
      .subscribe(data => {
        this.notificationService.sendNotification(`Successfully removed ${data}.`, 'success');
      });
  }
}
