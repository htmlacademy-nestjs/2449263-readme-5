import { Length } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { ChangePasswordDto } from './change-password.dto';
import { 
  AUTH_USERNAME_LENGTH_MIN, 
  AUTH_USERNAME_LENGTH_MAX 
} from '../auth.constant'


export class CreateUserDto extends PickType (
  ChangePasswordDto, 
  ['email', 'newPassword'] as const) 
{
  @ApiProperty({
    description: 'First name',
    example: 'Pavel',
  })
  @Length(AUTH_USERNAME_LENGTH_MIN, AUTH_USERNAME_LENGTH_MAX, {
    message: 'Username length must be between ' + AUTH_USERNAME_LENGTH_MIN +
      ' and ' + AUTH_USERNAME_LENGTH_MAX + ' charcters',
  })
  public firstname: string = "";

  @ApiProperty({
    description: 'Last name',
    example: 'Ivanov'
  })
  @Length(AUTH_USERNAME_LENGTH_MIN, AUTH_USERNAME_LENGTH_MAX, {
    message: 'Last name length must be between ' + AUTH_USERNAME_LENGTH_MIN +
      ' and ' + AUTH_USERNAME_LENGTH_MAX + ' charcters',
  })
  public lastname: string = "";
}