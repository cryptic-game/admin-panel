import { Component } from '@angular/core';
import { NotificationService } from '../notification.service';
import { interval } from 'rxjs';
import { Notification } from '../notification';
import { slideFromRight } from '../../animtaions';

@Component({
  selector: 'admin-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: [ './notification-list.component.scss' ],
  animations: [ slideFromRight ]
})
export class NotificationListComponent {

  notifications: Notification[];

  constructor(
    private notificationService: NotificationService
  ) {
    interval(1000).subscribe(() => this.notifications = this.notificationService.getNotifications());
  }

  trackBy(index: number, item: Notification): number {
    return item.id;
  }
}
