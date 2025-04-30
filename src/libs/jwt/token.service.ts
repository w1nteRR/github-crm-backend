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
    return this.jwtService.sign(payload, { expiresIn: '10m' });
  }

  public generateRefreshToken(payload: RefreshTokenPayload): Token {
    return this.jwtService.sign(payload, { expiresIn: '7d' });
  }
}
