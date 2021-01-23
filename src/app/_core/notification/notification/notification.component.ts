import {Component, HostBinding, Input} from '@angular/core';
import {Notification} from '../notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

  @Input()
  private notification: Notification;

  get notification0(): Notification {
    return this.notification;
  }

  @HostBinding('class.info')
  private get isInfo(): boolean {
    return this.notification.type === 'info';
  }

  @HostBinding('class.success')
  private get isSuccess(): boolean {
    return this.notification.type === 'success';
  }

  @HostBinding('class.warning')
  private get isWarning(): boolean {
    return this.notification.type === 'warning';
  }

  @HostBinding('class.error')
  private get isError(): boolean {
    return this.notification.type === 'error';
  }
}
