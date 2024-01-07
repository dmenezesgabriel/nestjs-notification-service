import { Content } from '@application/entities/content';
import { CancelNotification } from './cancel-notification';
import { InMemoryNotificationRepository } from '@test/in-memory-notification-repository';
import { Notification } from '@application/entities/notification';

describe('Cancel notification', () => {
  it('should be able to create a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    const notification = new Notification({
      category: 'social',
      content: new Content('Nova solicitação de amizade!'),
      recipientId: 'example-recipient-id',
    });

    await notificationRepository.create(notification);
    await cancelNotification.execute({ notificationId: notification.id });

    expect(notificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel notification when it does not exist', () => {});
});
