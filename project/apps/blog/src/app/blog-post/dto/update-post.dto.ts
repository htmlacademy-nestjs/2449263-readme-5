import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNotEmpty,IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty({
    description: 'Title',
    example: 'My yellow box'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public title?: string;

  @ApiProperty({
    description: 'Description',
    example: 'Yellow box size: 40x40'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public description?: string;

  @ApiProperty({
    description: 'Content',
    example: 'This is my first yellow box'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public content?: string;

  @ApiProperty({
    description: 'Array of categories UUIDs'
  })
  @IsUUID('all', { each: true })
  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  public categories?: string[];
}
