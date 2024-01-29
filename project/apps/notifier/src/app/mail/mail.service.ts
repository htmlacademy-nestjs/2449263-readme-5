import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { EMAIL_ADD_SUBSCRIBER_SUBJECT } from './mail.constant';
import { Subscriber } from '@project/libs/types';
import { NotifierConfig } from '@project/libs/config/notifier';


@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  @Inject(NotifierConfig.KEY)
  private readonly notifierConfig: ConfigType<typeof NotifierConfig>

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      from: this.notifierConfig.mail.from,
      to: subscriber.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './new-subscriber',
      context: {
        user: `${subscriber.firstname} ${subscriber.lastname}`,
        email: `${subscriber.email}`,
      }
    })
  }
}
