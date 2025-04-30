import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { User } from '../../../../domain/entities/User';
import { IUserRepository } from '../../../../domain/user.repository';
import { USER_REPOSITORY } from '../../../../user-di.tokens';
import { GetUserQuery } from '../get-user.query';

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler
  implements IQueryHandler<GetUserQuery, User | null>
{
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}

  public async execute(query: GetUserQuery): Promise<User | null> {
    const user = await this.userRepository.findByEmail(query.email);

    if (!user) return null;

    return user;
  }
}
