import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import applicationConfig from './app.config';
import dbConfig from './mongo.config';
import jwtConfig from './jwt.config';


const ENV_USERS_FILE_PATH = 'apps/user/user.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig, dbConfig, jwtConfig],
      envFilePath: ENV_USERS_FILE_PATH
    }),
  ]
})
export class ConfigUserModule {}