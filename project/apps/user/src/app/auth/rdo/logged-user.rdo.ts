import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13'
  })
  @Expose()
  public id: string = "";

  @ApiProperty({
    description: 'User email',
    example: 'user@user.local'
  })
  @Expose()
  public email: string = "";

  @ApiProperty({
    description: 'JWT access token'
  })
  @Expose()
  public accessToken: string = "";
}
