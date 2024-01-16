import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { BlogUserService } from './blog-user.service';
import { UserRdo } from '../rdo/user.rdo';
import { fillDto } from '@project/libs/helpers';


@Controller('blog-user')
export class BlogUserController {
  constructor(private readonly blogUserService: BlogUserService) {}

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    const existUser = await this.blogUserService.findOne(id);
    return fillDto(UserRdo, existUser.toPOJO());
  }
}
