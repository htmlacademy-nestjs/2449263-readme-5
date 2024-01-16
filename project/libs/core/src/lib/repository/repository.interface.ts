import { Entity, EntityIdType } from './entity.interface';

export interface Repository<T extends Entity<EntityIdType>> {
  findById(id: T['id']): Promise<T | null>;
//  create(entity: T): Promise<T>;
  save(entity: T): Promise<T>;
  update(id: T['id'], entity: T): Promise<T>;
  remove(id: T['id']): Promise<void>;
}
