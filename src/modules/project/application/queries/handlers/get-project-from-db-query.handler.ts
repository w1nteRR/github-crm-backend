import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { GetProjectFromDbQuery } from '../get-project-from-db.query';
import { PROJECT_REPOSITORY } from '../../../project-di.tokens';
import { IProjectRepository } from '../../../domain/project.repository';
import { Project } from '../../../domain/entities/Project';

@QueryHandler(GetProjectFromDbQuery)
export class GetProjectFromDbQueryHandler
  implements IQueryHandler<GetProjectFromDbQuery>
{
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: IProjectRepository,
  ) {}

  public async execute(query: GetProjectFromDbQuery): Promise<Project> {
    const project = await this.projectRepository.findById(query.project_id);

    if (!project) throw new NotFoundException('Project not found');

    return project;
  }
}
