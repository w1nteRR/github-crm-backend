import { IUserRepository } from '../domain/user.repository';
import { User } from '../domain/entities/User';
import { PrismaService } from '@libs/external/prisma/prisma.service';
import { UserMapper } from '../user.mapper';
import { Injectable } from '@nestjs/common';
import { User as PrismaUser } from '../../../../generated/prisma';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: UserMapper,
  ) {}

  public async findByEmail(email: string): Promise<User | null> {
    const user: PrismaUser | null = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return this.mapper.prismaToDomain(user);
  }

  public async save(user: User): Promise<void> {
    await this.prisma.user.create({
      data: this.mapper.domainToPrisma(user),
    });
  }
}
