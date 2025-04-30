import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuthSignInCommand } from '../auth-sign-in.command';
import { BcryptPasswordHasher } from '@libs/auth/bcrypt-password-hasher';
import { TokenService } from '@libs/jwt/token.service';
import { Tokens } from '@custom-types/jwt/token.types';
import { User } from '../../../../user/domain/entities/User';
import { GetUserQuery } from '../../../../user/application/application/queries/get-user.query';
import { Auth } from '../../../domain/entities/Auth';
import { PasswordHash } from '../../../domain/entities/value-objects/Password-hash.vo';

import { AUTH_REPOSITORY } from '../../../auth-di.tokens';
import { IAuthRepository } from '../../../domain/auth.repository';

@CommandHandler(AuthSignInCommand)
export class AuthSignInCommandHandler
  implements ICommandHandler<AuthSignInCommand, Tokens>
{
  constructor(
    @Inject(AUTH_REPOSITORY) private readonly authRepository: IAuthRepository,
    private readonly hasher: BcryptPasswordHasher,
    private readonly token: TokenService,
    private readonly queryBus: QueryBus,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async execute(command: AuthSignInCommand): Promise<Tokens> {
    const user: User | null = await this.queryBus.execute(
      new GetUserQuery(command.email),
    );

    if (!user) throw new NotFoundException('User not exists');

    const userProps = user.getProps();

    const auth = new Auth({
      id: user.id,
      props: {
        email: userProps.email,
        password_hash: PasswordHash.create(userProps.password),
      },
    });

    await auth.signIn({ password: command.password }, (plain, hash) =>
      this.hasher.compare(plain, hash),
    );

    const tokenPayload = {
      sub: auth.id,
      email: auth.getProps().email,
    };

    const access_token = this.token.generateAccessToken(tokenPayload);
    const refresh_token = this.token.generateRefreshToken(tokenPayload);

    await this.authRepository.saveRefreshToken(refresh_token);

    await auth.publishEvents(this.eventEmitter);

    return {
      access_token,
      refresh_token,
    };
  }
}
