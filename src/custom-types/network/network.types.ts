import { Request } from 'express';
import { IJwtPayload } from '@custom-types/jwt/token.types';

export interface AuthenticatedRequest extends Request {
  'jwt-payload': IJwtPayload;
}
