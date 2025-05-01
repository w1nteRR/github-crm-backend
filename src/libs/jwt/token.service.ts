import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  AccessTokenPayload,
  RefreshTokenPayload,
  Token,
} from '@custom-types/jwt/token.types';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  public generateAccessToken(payload: AccessTokenPayload): Token {
    //for dev
    return this.jwtService.sign(payload, { expiresIn: '1h' });
  }

  public generateRefreshToken(payload: RefreshTokenPayload): Token {
    return this.jwtService.sign(payload, { expiresIn: '7d' });
  }

  public validateRefreshToken(token: Token): RefreshTokenPayload {
    return this.jwtService.verify(token);
  }
}
