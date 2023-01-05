import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications';
import { CancelNotification } from './cancel-notification';
import { CountRecipientNotification } from './count-recipient-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Count recipients notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotification(
      notificationsRepository,
    );

    const notification = new Notification({
      category: 'social',
      content: new Content('Nova solicitacao de amizade'),
      recipientId: 'recipient-12',
    });

    const notification2 = new Notification({
      category: 'social',
      content: new Content('Nova solicitacao de amizade'),
      recipientId: 'recipient-123',
    });

    await notificationsRepository.create(notification);
    await notificationsRepository.create(notification);
    await notificationsRepository.create(notification2);

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-12',
    });

    expect(count).toEqual(2);
  });
});
