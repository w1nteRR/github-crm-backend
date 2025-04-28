import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FetchProjectQuery } from '../fetch-project.query';
import { GithubApiService } from '@libs/external/github/github-api.service';
import { IGitHubProject } from '@custom-types/github/github.types';

@QueryHandler(FetchProjectQuery)
export class FetchProjectQueryHandler
  implements IQueryHandler<FetchProjectQuery>
{
  constructor(private readonly githubApiService: GithubApiService) {}

  public async execute(
    query: FetchProjectQuery,
  ): Promise<IGitHubProject | null> {
    return await this.githubApiService.fetchProjectByName(query.project_name);
  }
}
