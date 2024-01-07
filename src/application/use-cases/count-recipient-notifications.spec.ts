import { Content } from '@application/entities/content';
import { CountRecipientNotifications } from './count-recipient-notifications';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { Notification } from '@application/entities/notification';
import { makeNotification } from '@test/factories/notification-factory';

describe('Count recipient notifications', () => {
  it('should be able to count recipients notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationRepository,
    );

    await notificationRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova solicitação de amizade!'),
        recipientId: 'recipient-1',
      }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
