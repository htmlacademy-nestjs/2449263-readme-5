import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { NotifierConfigModule, getMongooseOptions } from '@project/libs/config/notifier';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';
import { getRabbitMQOptions } from '@project/libs/helpers';


@Module({
  imports: [
    MongooseModule.forRootAsync(getMongooseOptions()),
    NotifierConfigModule,
    EmailSubscriberModule,
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('application.rabbit')
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
