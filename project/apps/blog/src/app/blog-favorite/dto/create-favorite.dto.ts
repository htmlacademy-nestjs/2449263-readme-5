import { ApiProperty } from '@nestjs/swagger';

export class CreateFavoriteDto {
  @ApiProperty({
    description: 'User favourites',
    example: 'User UUID'
  })
  public userId: string;
}
