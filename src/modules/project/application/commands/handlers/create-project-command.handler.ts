import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IGitHubProject } from '@custom-types/github/github.types';
import { CreateProjectCommand } from '../create-project.command';
import { FetchProjectQuery } from '../../queries/fetch-project.query';
import { ProjectMapper } from '../../../project.mapper';
import { PROJECT_REPOSITORY } from '../../../project-di.tokens';
import { IProjectRepository } from '../../../domain/project.repository';
import { Project } from '../../../domain/entities/Project';

@CommandHandler(CreateProjectCommand)
export class CreateProjectCommandHandler
  implements ICommandHandler<CreateProjectCommand>
{
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: IProjectRepository,
    private readonly eventEmitter: EventEmitter2,
    private readonly queryBus: QueryBus,
    private readonly mapper: ProjectMapper,
  ) {}

  public async execute(command: CreateProjectCommand): Promise<void> {
    const gitHubProject: IGitHubProject = await this.queryBus.execute(
      new FetchProjectQuery(command.project_name),
    );

    const domainProject = this.mapper.fromGithubToDomain(gitHubProject);
    const createdProject = Project.create(domainProject.getProps());

    await this.projectRepository.save(createdProject, command.user_id);

    await createdProject.publishEvents(this.eventEmitter);
  }
}
