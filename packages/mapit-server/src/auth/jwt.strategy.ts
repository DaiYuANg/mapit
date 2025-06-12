import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtConfig } from '../config/configuration';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const jwtConfig = configService.get<JwtConfig>('jwt')!;
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
    });
  }

  validate(payload: { sub: number; username: string }) {
    console.log('JWT payload:', payload);
    return { userId: payload.sub, username: payload.username };
  }
}
