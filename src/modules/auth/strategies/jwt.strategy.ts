import { Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import AUTH_CONFIG from '../auth.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super(AUTH_CONFIG.jwtStrategy());
  }

  public async validate(payload: any): Promise<any> {
    return payload;
  }
}
