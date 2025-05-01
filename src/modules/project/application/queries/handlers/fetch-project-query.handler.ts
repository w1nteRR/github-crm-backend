import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FetchProjectQuery } from '../fetch-project.query';
import { GithubApiService } from '@libs/external/github/github-api.service';
import { IGitHubProject } from '@custom-types/github/github.types';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(FetchProjectQuery)
export class FetchProjectQueryHandler
  implements IQueryHandler<FetchProjectQuery>
{
  constructor(private readonly githubApiService: GithubApiService) {}

  public async execute(
    query: FetchProjectQuery,
  ): Promise<IGitHubProject | null> {
    const result = await this.githubApiService.fetchProjectByName(
      query.project_name,
    );

    if (!result.id) {
      throw new NotFoundException('Project not found in GitHub');
    }

    return result;
  }
}
