import { Injectable } from '@nestjs/common';
import { Project } from './domain/entities/Project';
import type { IGitHubProject } from '@custom-types/github/github.types';

@Injectable()
export class ProjectMapper {
  public fromGithubToDomain(gitHubProject: IGitHubProject): Project {
    const {
      id,
      name,
      url,
      owner,
      stargazers_count,
      forks_count,
      open_issues_count,
      created_at,
    } = gitHubProject;

    return new Project({
      id: String(id),
      props: {
        name,
        owner: owner.login,
        url,
        stars: stargazers_count,
        forks: forks_count,
        issues: open_issues_count,
        createdAt: created_at,
      },
    });
  }
}
