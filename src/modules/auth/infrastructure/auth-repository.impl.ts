import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import {
  IRefreshToken,
  RefreshTokenPayload,
  Token,
} from '@custom-types/jwt/token.types';
import { PrismaService } from '@libs/external/prisma/prisma.service';
import { IAuthRepository } from '../domain/auth.repository';
import { PrismaClient, RefreshToken } from '../../../../generated/prisma';

@Injectable()
export class AuthRepositoryImpl implements IAuthRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  private async createRefreshToken(
    prisma: PrismaClient,
    token: Token,
  ): Promise<void> {
    const decoded: RefreshTokenPayload & { iat: number; exp: number } =
      this.jwt.decode(token);

    await prisma.refreshToken.create({
      data: {
        token,
        user_id: decoded.sub,
        expires_at: decoded.exp,
      },
    });
  }

  public async findRefreshToken(token: Token): Promise<IRefreshToken | null> {
    const foundToken: RefreshToken | null =
      await this.prisma.refreshToken.findUnique({
        where: { token },
      });

    if (!foundToken) return null;

    return foundToken;
  }

  public async saveRefreshToken(token: Token): Promise<void> {
    await this.createRefreshToken(this.prisma, token);
  }

  public async saveRefreshTokenWithTransaction(tokens: Token[]): Promise<void> {
    const [old, _new] = tokens;

    const decoded: RefreshTokenPayload & { iat: number; exp: number } =
      this.jwt.decode(_new);

    await this.prisma.$transaction(async (tx: PrismaClient) => {
      await tx.refreshToken.deleteMany({
        where: { token: old },
      });

      await tx.refreshToken.create({
        data: {
          token: _new,
          user_id: decoded.sub,
          expires_at: decoded.exp,
        },
      });
      // await this.createRefreshToken(tx, _new);
    });
  }
}
