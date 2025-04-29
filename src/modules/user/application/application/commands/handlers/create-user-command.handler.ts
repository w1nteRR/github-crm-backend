import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { ConflictException, Inject } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { CreateUserCommand } from '../create-user.command';
import { USER_REPOSITORY } from '../../../../user-di.tokens';
import { IUserRepository } from '../../../../domain/user.repository';
import { User } from '../../../../domain/entities/User';
import { GetUserQuery } from '../../queries/get-user.query';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    private readonly eventEmitter: EventEmitter2,
    private readonly queryBus: QueryBus,
  ) {}

  public async execute(command: CreateUserCommand): Promise<void> {
    const user: User | null = await this.queryBus.execute(
      new GetUserQuery(command.email),
    );

    if (user) {
      throw new ConflictException('User already exists');
    }

    const createdUser = User.create(command);

    await this.userRepository.save(createdUser);

    await createdUser.publishEvents(this.eventEmitter);
  }
}
