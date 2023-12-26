import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogUserRepository } from './blog-user.repository';
import { ERR_USER_NOTFOUND } from '../blog-user/blog-user.constant';


@Injectable()
export class BlogUserService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository
  ) {}

  public async findOne(id: string) {
    const existUser = await this.blogUserRepository.findById(id);
    if (!existUser) {
        throw new NotFoundException(ERR_USER_NOTFOUND);
    }
    return existUser;
  }
}
