import {
  Controller, HttpStatus,
  Get, Param,
  UseGuards
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { BlogUserService } from './blog-user.service';
import { UserRdo } from '../rdo/user.rdo';
import { fillDto } from '@project/libs/helpers';
import { MongoIdValidationPipe } from '@project/libs/core';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('blog-user')
export class BlogUserController {
  constructor(private readonly blogUserService: BlogUserService) {}

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async findOne(@Param('id', MongoIdValidationPipe) id: string) {
    const existUser = await this.blogUserService.findOne(id);
    return fillDto(UserRdo, existUser.toPOJO());
  }
}