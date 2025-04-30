export type Token = string;

export type AccessTokenPayload = {
  sub: string;
  email: string;
};

export type RefreshTokenPayload = {
  sub: string;
  email: string;
};

export type Tokens = {
  access_token: Token;
  refresh_token: Token;
};

export interface IJwtPayload {
  sub: string;
  email: string;
  iat?: number;
  exp?: number;
}
