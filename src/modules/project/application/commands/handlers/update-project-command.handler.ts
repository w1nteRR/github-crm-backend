import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateProjectCommand } from '../update-project.command';
import { IProjectRepository } from '../../../domain/project.repository';
import { PROJECT_REPOSITORY } from '../../../project-di.tokens';
import { Project } from '../../../domain/entities/Project';
import { GetProjectFromDbQuery } from '../../queries/get-project-from-db.query';
import { EventEmitter2 } from '@nestjs/event-emitter';

@CommandHandler(UpdateProjectCommand)
export class UpdateProjectCommandHandler
  implements ICommandHandler<UpdateProjectCommand>
{
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: IProjectRepository,
    private readonly queryBus: QueryBus,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async execute(command: UpdateProjectCommand) {
    const { project_props, user_id } = command;

    const project: Project = await this.queryBus.execute(
      new GetProjectFromDbQuery(project_props.id, user_id),
    );

    await this.projectRepository.update(project_props, user_id);

    project.update(command.project_props);
    await project.publishEvents(this.eventEmitter);
  }
}
