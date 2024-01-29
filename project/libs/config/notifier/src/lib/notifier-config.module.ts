import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ENV_FILE_PATH } from './notifier.constant';
import notifyConfig from './notifier.config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [notifyConfig],
      envFilePath: ENV_FILE_PATH
    }),
  ]
})
export class NotifierConfigModule {}