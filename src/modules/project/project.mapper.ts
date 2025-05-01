import { Injectable } from '@nestjs/common';
import { Project } from './domain/entities/Project';
import type { IGitHubProject } from '@custom-types/github/github.types';
import { Project as PrismaProject } from '../../../generated/prisma';

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

    const date = new Date(created_at);
    const unix = Math.floor(date.getTime() / 1000);

    return new Project({
      id: String(id),
      props: {
        name,
        owner: owner.login,
        url,
        stars: stargazers_count,
        forks: forks_count,
        issues: open_issues_count,
        created_at: unix,
      },
    });
  }

  public fromDomainToPrisma(project: Project) {
    const { name, owner, url, created_at, stars, issues, forks } =
      project.getProps();
    const id = project.id;

    return {
      id,
      name,
      owner,
      url,
      stars,
      forks,
      issues,
      created_at: Math.floor(created_at / 1000),
    };
  }

  public fromPrismaToDomain(project: PrismaProject): Project {
    return new Project({
      id: project.id,
      props: project,
    });
  }
}
