import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AUTH_USER_INVALID_EMAIL } from '../auth.constant'

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Email: user identifier',
    example: 'user@local.local'
  })
  @IsEmail({}, { message: AUTH_USER_INVALID_EMAIL })
  public email: string = "";

  @ApiProperty({
    description: 'Current password',
    example: '123456'
  })
  @IsNotEmpty()
  public password: string = "";

  @ApiProperty({
    description: 'New password',
    example: '123456'
  })
  @Length(6, 12, {
    message: 'New password length must be between 6 and 12 charcters',
  })
  public newPassword: string = "";
}