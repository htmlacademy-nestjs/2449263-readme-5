import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserRdo {
  @Expose()
  @ApiProperty({
    description: 'Unique user ID',
    example: '13'
  })
  public id: string = "";

  @ApiProperty({
    description: 'User email',
    example: 'user@local.local'
  })
  @Expose()
  public email: string = "";

  @ApiProperty({
    description: 'First name',
    example: 'Pavel'
  })
  @Expose()
  public firstname: string = "";

  @ApiProperty({
    description: 'Last name',
    example: 'Ivanov'
  })
  @Expose()
  public lastname: string = "";

  @ApiProperty({
    description: 'Registration date',
    example: '2023-12-12'
  })
  @Expose()
  public registrationDate: string = "";
}
