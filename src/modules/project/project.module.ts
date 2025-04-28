import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProjectController } from './project.controller';
import { CreateProjectCommandHandler } from './application/commands/handlers/create-project-command.handler';
import { GetProjectQueryHandler } from './application/queries/handlers/get-project-query.handler';
import { GithubApiService } from '@libs/external/github/github-api.service';
import { ProjectMapper } from './project.mapper';
import { PROJECT_REPOSITORY } from './project-di.tokens';
import { ProjectRepositoryImpl } from './infrastructure/project-repository.impl';

const controllers = [ProjectController];
const commandHandlers: Provider[] = [CreateProjectCommandHandler];
const queryHandlers: Provider[] = [GetProjectQueryHandler];
const mappers: Provider[] = [ProjectMapper];

const externalServices: Provider[] = [GithubApiService];

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
