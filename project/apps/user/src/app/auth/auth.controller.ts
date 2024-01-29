import { 
  Controller, 
  Post, 
  Body, 
  Param, 
  HttpStatus, HttpCode,
  UseGuards, 
  Req
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillDto } from '@project/libs/helpers';
import { UserRdo } from '../rdo/user.rdo';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChangePasswordDto } from './dto/change-password.dto';
import { NotificationService } from '../notification/notification.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { BlogUserEntity } from '../blog-user/entities/blog-user.entity';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';


interface RequestWithUser {
  user?: BlogUserEntity;
}

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    const { email, firstname, lastname } = newUser;
    await this.notificationService.registerSubscriber({ email, firstname, lastname });

    return fillDto(UserRdo, newUser.toPOJO());
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged in.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid password or username',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Req() { user }: RequestWithUser) {
    const userToken = await this.authService.createUserToken(user!);
    return fillDto(LoggedUserRdo, { ...user!.toPOJO(), ...userToken });
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User password has been successfully changed'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid password or username',
  })
  @Post('changepwd')
  public async changepwd(@Body() dto: ChangePasswordDto) {
    const verifiedUser = await this.authService.changeUserPassword(dto);
    return fillDto(LoggedUserRdo, verifiedUser.toPOJO());
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens'
  })
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user!);
  }
}
