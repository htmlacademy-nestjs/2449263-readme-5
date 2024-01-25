import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'Title',
    example: 'My yellow box'
  })
  public title: string;

  @ApiProperty({
    description: 'Description',
    example: 'Yellow box size: 40x40'
  })
  public description: string;

  @ApiProperty({
    description: 'Content',
    example: 'This is my first yellow box'
  })
  public content: string;

  @ApiProperty({
    description: 'User ID (MongoID)'
  })
  public userId: string;

  @ApiProperty({
    description: 'Categories: array of UUIDs'
  })
  public categories: string[];
}
