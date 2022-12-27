import { Notification } from '@application/entities/notification';

export class NotificationViewModel {
  static toHttp(notification: Notification) {
    return {
      id: notification.id,
      content: notification.category,
      recipientId: notification.recipientId,
    };
  }
}
