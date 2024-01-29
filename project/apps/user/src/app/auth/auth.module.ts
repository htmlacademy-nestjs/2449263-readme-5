import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { BlogUserModule } from '../blog-user/blog-user.module';
import { getJwtOptions } from '@project/libs/config/user';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { NotificationModule } from '../notification/notification.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';


@Module({
  controllers: [AuthController],
  providers: [
    AuthService, 
    JwtAccessStrategy, 
    LocalStrategy,
    JwtRefreshStrategy,
  ],
  imports: [
    BlogUserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    NotificationModule,
  ],
})
export class AuthModule {}
