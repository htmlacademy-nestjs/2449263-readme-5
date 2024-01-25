import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty({
    description: 'Title',
    example: 'My yellow box'
  })
  public title?: string;

  @ApiProperty({
    description: 'Description',
    example: 'Yellow box size: 40x40'
  })
  public description?: string;

  @ApiProperty({
    description: 'Content',
    example: 'This is my first yellow box'
  })
  public content?: string;

  @ApiProperty({
    description: 'Array of categories UUIDs'
  })
  public categories?: string[];
}
