import { SendNotification } from './send-notification';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';

describe('Send notification', () => {
  it('should be able to create a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const sendNotification = new SendNotification(notificationRepository);

    const { notification } = await sendNotification.execute({
      recipientId: 'recipient-id-example',
      category: 'social',
      content: 'This is a notification',
    });

    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notificationRepository.notifications[0]).toEqual(notification);
  });
});
