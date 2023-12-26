import { Length } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { ChangePasswordDto } from './change-password.dto';

export class CreateUserDto extends PickType (
  ChangePasswordDto, 
  ['email', 'newPassword'] as const) 
{
  @ApiProperty({
    description: 'First name',
    example: 'Pavel',
  })
  @Length(3, 50, {
    message: 'Username length must be between 3 and 50 charcters',
  })
  public firstname: string = "";

  @ApiProperty({
    description: 'Last name',
    example: 'Ivanov'
  })
  public lastname: string = "";
}