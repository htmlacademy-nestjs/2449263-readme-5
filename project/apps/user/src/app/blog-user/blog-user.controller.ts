import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { BlogUserService } from './blog-user.service';


@Controller('blog-user')
export class BlogUserController {
  constructor(private readonly blogUserService: BlogUserService) {}

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return await this.blogUserService.findOne(id);
  }
}
