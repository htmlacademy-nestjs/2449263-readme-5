import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { BlogUserModule } from '../blog-user/blog-user.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [BlogUserModule],
})
export class AuthModule {}
