import { IUserRepository } from '../domain/user.repository';
import { User } from '../domain/entities/User';
import { PrismaService } from '@libs/external/prisma/prisma.service';
import { UserMapper } from '../user.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: UserMapper,
  ) {}

  findByEmail(email: string): Promise<User | null> {
    console.log('email:', email);
    return Promise.resolve(null);
  }

  public async save(user: User): Promise<void> {
    await this.prisma.user.create({
      data: this.mapper.domainToPrisma(user),
    });
  }
}
