import { IQuery, QueryHandler } from '@nestjs/cqrs';
import { GetProjectQuery } from '../get-project.query';
import { GithubApiService } from '@libs/external/github/github-api.service';
import { IGitHubProject } from '@custom-types/github/github.types';

@QueryHandler(GetProjectQuery)
export class GetProjectQueryHandler implements IQuery {
  constructor(private readonly githubApiService: GithubApiService) {}

  public async execute(query: GetProjectQuery): Promise<IGitHubProject | null> {
    return await this.githubApiService.fetchProjectByName(query.project_name);
  }
}
