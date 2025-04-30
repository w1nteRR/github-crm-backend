import { Injectable } from '@nestjs/common';
import { Prisma, User } from '../../../generated/prisma';
import { User as DomainUser } from './domain/entities/User';

@Injectable()
export class UserMapper {
  public domainToPrisma(user: DomainUser): Prisma.UserCreateInput {
    const { email, password } = user.getProps();

    return {
      id: user.id,
      email,
      password,
    };
  }

  public prismaToDomain(user: User): DomainUser {
    return new DomainUser({ id: user.id, props: user });
  }
}
