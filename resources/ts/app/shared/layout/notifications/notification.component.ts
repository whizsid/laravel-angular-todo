import { Component, OnInit } from '@angular/core';
import NotificationService, { INotification } from 'resources/ts/app/core/services/notification.service';

@Component({
  selector: 'app-notification-component',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent  {

  public notifications: INotification[];

  constructor(
    private notificationService: NotificationService
  ) {
    this.notificationService.getNotifications.subscribe(notifications => {
      this.notifications = notifications;
    });
  }

  handleDeleteNotification = (notification: INotification) => {
    this.notificationService.delete(notification);
  }
}
