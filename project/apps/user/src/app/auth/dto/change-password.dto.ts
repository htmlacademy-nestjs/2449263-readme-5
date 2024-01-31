import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { 
  AUTH_USER_INVALID_EMAIL, 
  AUTH_PASSWORD_LENGTH_MIN, 
  AUTH_PASSWORD_LENGTH_MAX 
} from '../auth.constant'

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
  @Length(AUTH_PASSWORD_LENGTH_MIN, AUTH_PASSWORD_LENGTH_MAX, {
    message: 'New password length must be between ' + AUTH_PASSWORD_LENGTH_MIN + ' and ' +
    AUTH_PASSWORD_LENGTH_MAX + ' charcters',
  })
  public newPassword: string = "";
}