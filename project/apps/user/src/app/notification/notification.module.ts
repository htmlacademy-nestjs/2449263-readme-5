import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { getRabbitMQOptions } from '@project/libs/helpers';
import { NotificationService } from './notification.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('rabbit')
    )
  ],
  providers: [NotificationService],
  exports: [NotificationService]
})
export class NotificationModule {}
