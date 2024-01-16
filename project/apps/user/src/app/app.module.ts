import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { BlogUserModule } from './blog-user/blog-user.module';
import { ConfigUserModule, getMongooseOptions } from '@project/libs/config/user';


@Module({
  imports: [
    AuthModule, 
    BlogUserModule, 
    ConfigUserModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    )
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
