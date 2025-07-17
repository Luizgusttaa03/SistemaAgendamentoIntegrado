import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

/**
 * Strategy JWT para autenticação via Passport
 * Valida tokens JWT e retorna o usuário autenticado
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET') || 'default-secret',
    });
  }

  /**
   * Valida o payload do token JWT
   * @param payload - Payload do token
   * @returns Usuário autenticado
   */
  async validate(payload: any) {
    return await this.authService.validateUser(payload.sub);
  }
}
