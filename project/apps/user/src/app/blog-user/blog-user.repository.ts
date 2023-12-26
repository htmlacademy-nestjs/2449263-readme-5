import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/libs/core';
import { BlogUserEntity } from './entities/blog-user.entity';

@Injectable()
export class BlogUserRepository extends BaseMemoryRepository<BlogUserEntity> {
  public findByEmail(email: string): Promise<BlogUserEntity | null> {
    const entities = Array.from(this.entities.values());
    const user = entities.find((entity) => entity.email === email) || null;
    return Promise.resolve(user);
  }
}
