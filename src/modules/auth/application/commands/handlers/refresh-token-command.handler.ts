import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RefreshTokenCommand } from '../refresh-token.command';
import { IJwtPayload, Tokens } from '@custom-types/jwt/token.types';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { AUTH_REPOSITORY } from '../../../auth-di.tokens';
import { IAuthRepository } from '../../../domain/auth.repository';
import { TokenService } from '@libs/jwt/token.service';
import { JwtService } from '@nestjs/jwt';

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenCommandHandler
  implements ICommandHandler<RefreshTokenCommand, Tokens>
{
  constructor(
    @Inject(AUTH_REPOSITORY) private readonly authRepository: IAuthRepository,
    private readonly token: TokenService,
    private readonly jwt: JwtService,
  ) {}

  public async execute(command: RefreshTokenCommand): Promise<Tokens> {
    const payload: IJwtPayload = this.token.validateRefreshToken(
      command.refreshToken,
    );

    if (!payload.sub) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const foundToken = await this.authRepository.findRefreshToken(
      command.refreshToken,
    );

    if (!foundToken || foundToken.revoked) {
      throw new UnauthorizedException('Refresh token revoked or not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { exp, iat, ...cleanPayload } = payload;

    const newAccessToken = this.token.generateAccessToken(cleanPayload);
    const newRefreshToken = this.token.generateRefreshToken(cleanPayload);

    await this.authRepository.saveRefreshTokenWithTransaction([
      command.refreshToken,
      newRefreshToken,
    ]);

    return {
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
    };
  }
}
