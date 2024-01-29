import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';

import { AuthService } from '../auth.service';
import { User } from '@project/libs/types';
import { USERNAME_FIELD_NAME } from '../auth.constant';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: USERNAME_FIELD_NAME });
  }

  public async validate(email: string, password: string): Promise<User> {
    return this.authService.verifyUser({ email, password })
  }
}
