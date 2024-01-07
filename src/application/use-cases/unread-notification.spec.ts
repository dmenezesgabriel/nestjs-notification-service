import { UnreadNotification } from './unread-notification';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';

describe('Unread notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    const notification = makeNotification({ readAt: new Date() });
    await notificationRepository.create(notification);
    await unreadNotification.execute({ notificationId: notification.id });

    expect(notificationRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to ununread a non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    expect(async () => {
      return unreadNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
