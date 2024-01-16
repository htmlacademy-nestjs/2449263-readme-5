import { compare, genSalt, hash } from 'bcrypt';
import { AuthUser } from '@project/libs/types';
import { Entity } from '@project/libs/core';
import { CRYPT_SALT_ROUNDS } from '../blog-user.constant';

export class BlogUserEntity implements AuthUser, Entity<string> {
  public id?: string;
  public email: string = '';
  public firstname: string = '';
  public lastname: string = '';
  public passwordHash: string = '';
  public readonly registrationDate: Date = new Date();

  constructor(user: AuthUser) {
    this.populate(user);
  }

  public toPOJO() {
    return {
      id: this.id,
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
      passwordHash: this.passwordHash,
      registrationDate: this.registrationDate
    };
  }

  public populate(data: AuthUser): void {
    this.id = data.id;
    this.email = data.email;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.passwordHash = data.passwordHash;
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(CRYPT_SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  static fromObject(data: AuthUser): BlogUserEntity {
    return new BlogUserEntity(data);
  }
}