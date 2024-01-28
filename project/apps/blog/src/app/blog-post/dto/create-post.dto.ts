import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString, IsUUID, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'Title',
    example: 'My yellow box'
  })
  @IsString()
  @IsNotEmpty()
  public title: string;

  @ApiProperty({
    description: 'Description',
    example: 'Yellow box size: 40x40'
  })
  @IsString()
  @IsNotEmpty()
  public description: string;

  @ApiProperty({
    description: 'Content',
    example: 'This is my first yellow box'
  })
  @IsString()
  @IsNotEmpty()
  public content: string;

  @ApiProperty({
    description: 'User ID (MongoID)'
  })
  @IsMongoId()
  public userId: string;

  @ApiProperty({
    description: 'Categories: array of UUIDs'
  })
  @IsUUID('all', { each: true })
  @IsArray()
  @ArrayNotEmpty()
  public categories: string[];
}
