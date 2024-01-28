import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogUserService } from './blog-user.service';
import { BlogUserController } from './blog-user.controller';
import { BlogUserRepository } from './blog-user.repository';
import { BlogUserModel, BlogUserSchema } from './blog-user.model';
import { getJwtOptions } from '@project/libs/config/user';
import { JwtAccessStrategy } from '../auth/strategies/jwt-access.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogUserModel.name, schema: BlogUserSchema }
    ]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    })
  ],
  controllers: [BlogUserController],
  providers: [BlogUserService, BlogUserRepository, JwtAccessStrategy],
  exports: [BlogUserRepository],
})
export class BlogUserModule {}
