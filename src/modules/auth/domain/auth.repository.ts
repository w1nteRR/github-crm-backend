import { IRefreshToken, Token } from '@custom-types/jwt/token.types';

export interface IAuthRepository {
  saveRefreshToken(refreshToken: Token): Promise<void>;
  findRefreshToken(refreshToken: Token): Promise<IRefreshToken | null>;
  saveRefreshTokenWithTransaction(tokens: Token[]): Promise<void>;
}
