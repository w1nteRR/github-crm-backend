import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProjectController } from './project.controller';
import { CreateProjectCommandHandler } from './application/commands/handlers/create-project-command.handler';
import { FetchProjectQueryHandler } from './application/queries/handlers/fetch-project-query.handler';
import { GithubApiService } from '@libs/external/github/github-api.service';
import { ProjectMapper } from './project.mapper';
import { PROJECT_REPOSITORY } from './project-di.tokens';
import { ProjectRepositoryImpl } from './infrastructure/project-repository.impl';
import { PrismaService } from '@libs/external/prisma/prisma.service';

import { JwtAuthGuard } from '@libs/auth/validate-token.guard';
import { GetUserProjectsQueryHandler } from './application/queries/handlers/get-user-projects-query.handler';
import { DeleteProjectCommandHandler } from './application/commands/handlers/delete-project-command.handler';
import { GetProjectFromDbQueryHandler } from './application/queries/handlers/get-project-from-db-query.handler';
import { UpdateProjectCommandHandler } from './application/commands/handlers/update-project-command.handler';

const controllers = [ProjectController];
const commandHandlers: Provider[] = [
  CreateProjectCommandHandler,
  DeleteProjectCommandHandler,
  UpdateProjectCommandHandler,
];
const queryHandlers: Provider[] = [
  FetchProjectQueryHandler,
  GetUserProjectsQueryHandler,
  GetProjectFromDbQueryHandler,
];
const mappers: Provider[] = [ProjectMapper];

const externalServices: Provider[] = [
  GithubApiService,
  PrismaService,
  JwtAuthGuard,
];

const repositories = [
  { provide: PROJECT_REPOSITORY, useClass: ProjectRepositoryImpl },
];

@Module({
  imports: [CqrsModule],
  controllers: [...controllers],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    ...externalServices,
    ...mappers,
    ...repositories,
  ],
})
export class ProjectModule {}
