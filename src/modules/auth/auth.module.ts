import { Module, Provider } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthSignUpCommandHandler } from './application/commands/handlers/auth-sign-up-command.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { BcryptPasswordHasher } from '@libs/auth/bcrypt-password-hasher';
import { UserSignedUpListener } from '../user/application/application/listeners/user-signed-up.listener';
import { AuthSignInCommandHandler } from './application/commands/handlers/auth-sign-in-command.handler';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from '@libs/jwt/token.service';
import { AUTH_REPOSITORY } from './auth-di.tokens';
import { AuthRepositoryImpl } from './infrastructure/auth-repository.impl';
import { PrismaService } from '@libs/external/prisma/prisma.service';
import { RefreshTokenCommandHandler } from './application/commands/handlers/refresh-token-command.handler';

const controllers = [AuthController];
const commandHandlers: Provider[] = [
  AuthSignUpCommandHandler,
  AuthSignInCommandHandler,
  RefreshTokenCommandHandler,
];
const listeners: Provider[] = [UserSignedUpListener];

const externalServices: Provider[] = [
  BcryptPasswordHasher,
  TokenService,
  PrismaService,
];

const repositories = [
  { provide: AUTH_REPOSITORY, useClass: AuthRepositoryImpl },
];

// process.env.JWT_SECRET,
@Module({
  imports: [
    CqrsModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '7d' },
      secret: 'secret',
    }),
  ],
  controllers: [...controllers],
  providers: [
    ...commandHandlers,
    ...listeners,
    ...externalServices,
    ...repositories,
  ],
})
export class AuthModule {}
