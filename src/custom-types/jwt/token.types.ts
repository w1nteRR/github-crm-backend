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
  accessToken: Token;
  refreshToken: Token;
};
