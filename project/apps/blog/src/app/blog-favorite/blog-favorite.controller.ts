import { 
    Body, Controller, Delete, Get, HttpCode, HttpStatus, 
    Param, Post 
  } from '@nestjs/common';

import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { fillDto } from '@project/libs/helpers';
import { FavoriteRdo } from './rdo/favorite.rdo';
import { BlogFavoriteService } from './blog-favorite.service';

@Controller('posts/:postId/favorites')
export class BlogFavoriteController {
  constructor(
    private readonly blogFavoriteService: BlogFavoriteService,
  ) {}

  @Get('/')
  public async show(@Param('postId') postId: string) {
    const favorites = await this.blogFavoriteService.getFavoritesByPost(postId);
    return fillDto(FavoriteRdo, favorites.map((favorite) => favorite.toPOJO()));
  }

  @Post('/')
  public async create(
    @Param('postId') postId: string,
    @Body() dto: CreateFavoriteDto
  ) {
    const newFavorite = await this.blogFavoriteService.createFavorite(postId, dto);
    return fillDto(FavoriteRdo, newFavorite.toPOJO());
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('id') id: string) {
    await this.blogFavoriteService.removeFavorite(id);
  }
}