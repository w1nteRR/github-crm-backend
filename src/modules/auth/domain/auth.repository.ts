import { Token } from '@custom-types/jwt/token.types';

export interface IAuthRepository {
  saveRefreshToken(refreshToken: Token): Promise<void>;
  findRefreshToken(refreshToken: Token): Promise<Token | null>;
}
