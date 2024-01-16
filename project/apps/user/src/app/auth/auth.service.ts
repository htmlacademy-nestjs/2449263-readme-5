import { 
  ConflictException, 
  Injectable, 
  UnauthorizedException 
} from '@nestjs/common';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto'
import { BlogUserEntity } from '../blog-user/entities/blog-user.entity';
import { 
  AUTH_ERR_USERALREADYEXIST, 
  AUTH_ERR_INVALID_PASSWORD_OR_USERNAME,
} from './auth.constant';
import { genRandomPassword } from '@project/libs/helpers';


@Injectable()
export class AuthService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository
  ) {}

  public async register(dto: CreateUserDto) {
    const newUser = await this.create(dto);
    return await this.changePassword(newUser, dto.newPassword);
  }

  private async create(dto: CreateUserDto) {
    const {email, firstname, lastname} = dto;
    const newPassword = genRandomPassword();

    const blogUser = {
      email, 
      firstname, 
      lastname,
      passwordHash: ''
    };

    const existUser = await this.blogUserRepository
      .findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_ERR_USERALREADYEXIST);
    }

    const userEntity = await new BlogUserEntity(blogUser)
      .setPassword(newPassword)

    return this.blogUserRepository
      .save(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser || !await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_ERR_INVALID_PASSWORD_OR_USERNAME);
    }

    return existUser;
  }

  private async changePassword(user: BlogUserEntity, newPassword: string): Promise<BlogUserEntity>{
    const newPwdUser = await user.setPassword(newPassword);
    return this.blogUserRepository.update(newPwdUser.id, newPwdUser);
  }

  public async changeUserPassword(dto: ChangePasswordDto) {
    const existUser = await this.verifyUser(dto);
    return await this.changePassword(existUser, dto.newPassword);
  }
}
