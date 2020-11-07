import { Injectable } from '@angular/core';
import { Notification } from './notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notifications: Notification[];
  private id: number;

  constructor() {
    this.notifications = [];
    this.id = 0;
  }

  public sendNotification(text: string, type: 'info' | 'success' | 'warning' | 'error'): void {
    this.notifications.push({ id: this.id, text, type, time: 11 });
    this.id++;
  }

  public getNotifications(): Notification[] {
    return this.notifications = this.notifications.filter(notification => {
      notification.time--;
      return notification.time !== 0;
    });
  }
}
