import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from '@libs/external/prisma/prisma.service';
import { UserController } from './user.controller';
import { CreateUserCommandHandler } from './application/application/commands/handlers/create-user-command.handler';
import { USER_REPOSITORY } from './user-di.tokens';
import { UserRepositoryImpl } from './infrastructure/user-repository.impl';
import { GetUserQueryHandler } from './application/application/queries/handlers/get-user-query.handler';
import { UserMapper } from './user.mapper';

const controllers = [UserController];
const commandHandlers: Provider[] = [CreateUserCommandHandler];
const queryHandlers: Provider[] = [GetUserQueryHandler];

const externalServices: Provider[] = [PrismaService];

const mappers: Provider[] = [UserMapper];

const repositories = [
  { provide: USER_REPOSITORY, useClass: UserRepositoryImpl },
];

@Module({
  imports: [CqrsModule],
  controllers: [...controllers],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    ...externalServices,
    ...repositories,
    ...mappers,
  ],
})
export class UserModule {}
