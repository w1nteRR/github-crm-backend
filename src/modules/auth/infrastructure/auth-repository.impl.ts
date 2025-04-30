import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { RefreshTokenPayload, Token } from '@custom-types/jwt/token.types';
import { PrismaService } from '@libs/external/prisma/prisma.service';
import { IAuthRepository } from '../domain/auth.repository';

@Injectable()
export class AuthRepositoryImpl implements IAuthRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  public async findRefreshToken(token: Token): Promise<Token | null> {
    return Promise.resolve(token);
  }

  public async saveRefreshToken(token: Token): Promise<void> {
    const decoded: RefreshTokenPayload & { iat: number; exp: number } =
      this.jwt.decode(token);

    await this.prisma.refreshToken.create({
      data: {
        token,
        user_id: decoded.sub,
        expires_at: decoded.exp,
      },
    });

    return Promise.resolve();
  }
}
