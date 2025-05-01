import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DeleteProjectCommand } from '../delete-project.command';
import { PROJECT_REPOSITORY } from '../../../project-di.tokens';
import { IProjectRepository } from '../../../domain/project.repository';
import { GetProjectFromDbQuery } from '../../queries/get-project-from-db.query';
import { Project } from '../../../domain/entities/Project';

@CommandHandler(DeleteProjectCommand)
export class DeleteProjectCommandHandler
  implements ICommandHandler<DeleteProjectCommand>
{
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: IProjectRepository,
    private readonly eventEmitter: EventEmitter2,
    private readonly queryBus: QueryBus,
  ) {}

  public async execute(command: DeleteProjectCommand): Promise<void> {
    const project: Project = await this.queryBus.execute(
      new GetProjectFromDbQuery(command.project_id, command.user_id),
    );

    await this.projectRepository.delete({
      project_id: project.id,
      user_id: command.user_id,
    });

    project.delete();
    await project.publishEvents(this.eventEmitter);
  }
}
