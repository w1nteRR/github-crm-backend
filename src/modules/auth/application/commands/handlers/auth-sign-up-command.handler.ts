import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ConflictException } from '@nestjs/common';
import { AuthSignUpCommand } from '../auth-sign-up.command';
import { BcryptPasswordHasher } from '@libs/auth/bcrypt-password-hasher';
import { GetUserQuery } from '../../../../user/application/application/queries/get-user.query';
import { User } from '../../../../user/domain/entities/User';
import { Auth } from '../../../domain/entities/Auth';

@CommandHandler(AuthSignUpCommand)
export class AuthSignUpCommandHandler
  implements ICommandHandler<AuthSignUpCommand>
{
  constructor(
    private readonly hasher: BcryptPasswordHasher,
    private readonly queryBus: QueryBus,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async execute(command: AuthSignUpCommand): Promise<void> {
    const user: User | null = await this.queryBus.execute(
      new GetUserQuery(command.email),
    );

    if (user) throw new ConflictException('User already exists');

    const passwordHash = await this.hasher.hash(command.password);

    const auth = Auth.signUp({ password: passwordHash, email: command.email });

    await auth.publishEvents(this.eventEmitter);
  }
}
