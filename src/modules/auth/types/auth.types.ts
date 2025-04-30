import { PasswordHash } from '../domain/entities/value-objects/Password-hash.vo';

export interface IAuthProps {
  email: string;
  password_hash: PasswordHash;
}

export interface ISignUpProps {
  email: string;
  password: string;
}

export interface ISignInProps {
  password: string;
}
