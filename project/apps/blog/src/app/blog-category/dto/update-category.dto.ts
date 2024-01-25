import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'Unique category name',
    example: 'Category1'
  })
  public title: string;
}