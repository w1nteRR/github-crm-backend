import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetUserProjectsQuery } from '../get-user-projects.query';
import { PROJECT_REPOSITORY } from '../../../project-di.tokens';
import { IProjectRepository } from '../../../domain/project.repository';
import { ProjectList } from '../../../types/project.types';

@QueryHandler(GetUserProjectsQuery)
export class GetUserProjectsQueryHandler
  implements IQueryHandler<GetUserProjectsQuery, ProjectList>
{
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: IProjectRepository,
  ) {}

  public async execute(query: GetUserProjectsQuery): Promise<ProjectList | []> {
    const projects = await this.projectRepository.findMany(query.user_id);

    if (!projects.length) return [];

    return projects;
  }
}
