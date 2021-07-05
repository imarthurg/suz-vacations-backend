import { ConfigService } from '@App/modules/shared/services/config.service';
import { ExtractJwt } from 'passport-jwt';

const configService = new ConfigService();

const AUTH_CONFIG = Object.freeze({
  localStrategy() {
    return {
      usernameField: 'email',
    };
  },
  jwtStrategy() {
    return {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.JwtSecret,
    };
  },
  jwtModule() {
    return {
      secret: configService.JwtSecret,
      signOptions: {
        expiresIn: configService.JwtExpirationTime,
      },
    };
  },
});

export default AUTH_CONFIG;
