import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Unique category name',
    example: 'Category1'
  })
  public title: string;
}