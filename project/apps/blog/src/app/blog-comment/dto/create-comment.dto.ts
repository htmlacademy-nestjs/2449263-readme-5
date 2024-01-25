import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment message'
  })
  public message: string;

  @ApiProperty({
    description: 'Comment author id',
    example: 'UUID'
  })
  public userId: string;
}
