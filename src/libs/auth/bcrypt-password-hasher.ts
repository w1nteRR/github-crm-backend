import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

const saltOrRounds = 10;

@Injectable()
export class BcryptPasswordHasher {
  async compare(plain: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plain, hash);
  }

  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, saltOrRounds);
  }
}
