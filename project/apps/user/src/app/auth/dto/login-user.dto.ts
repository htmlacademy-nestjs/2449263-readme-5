import { PickType } from '@nestjs/swagger';
import { ChangePasswordDto } from './change-password.dto';

export class LoginUserDto extends PickType (ChangePasswordDto, ['email', 'password'] as const ) {}
