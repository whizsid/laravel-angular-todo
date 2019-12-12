export interface INotificationAction {
  label: string;
  callback: (id: string) => void;
}

export interface INotification {
  message: string;
  color: string;
  timeout?: number;
  id: number;
  actions?: INotificationAction [];
}

export const NOTIFICATION_SUCCESS_COLOR = '#00FF00';
export const NOTIFICATION_ERROR_COLOR = '#FF0000';
export const NOTIFICATION_WARNING_COLOR = '#00FFFF';
export const NOTIFICATION_CONFIRM_COLOR = '#0000ff';

export default class NotificationService {

  protected notifications: {
    [x: string]: INotification;
  } = {};

  protected lastId = -1;

  public success(message: string, timeout?: number): number {
    return this.setSimpleNotification(message, 'success', timeout);
  }

  public warn(message: string, timeout?: number): number {
    return this.setSimpleNotification(message, 'warn', timeout);
  }

  public error(message: string, timeout?: number): number {
    return this.setSimpleNotification(message, 'error', timeout);
  }

  protected setSimpleNotification(message: string, type: 'error' | 'success' | 'warn', timeout?: number): number {
    const color =
      type === 'error' ? NOTIFICATION_ERROR_COLOR : ( type === 'success' ? NOTIFICATION_SUCCESS_COLOR : NOTIFICATION_WARNING_COLOR );

    this.lastId = this.lastId + 1 ;

    const id = this.lastId;

    this.notifications[this.lastId] = {
      message,
      timeout,
      id,
      color
    };

    if (timeout) {
      window.setTimeout(() => {
        delete this.notifications[id];
      }, timeout);
    }

    return id;
  }

}
