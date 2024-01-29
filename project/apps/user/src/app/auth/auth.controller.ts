import { 
  Controller, 
  Post, 
  Body, 
  Param, 
  HttpStatus,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillDto } from '@project/libs/helpers';
import { UserRdo } from '../rdo/user.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChangePasswordDto } from './dto/change-password.dto';
import { NotificationService } from '../notification/notification.service';



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
  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    const userToken = await this.authService.createUserToken(verifiedUser);

    return fillDto(LoggedUserRdo, { ...verifiedUser.toPOJO(), ...userToken });
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
}
