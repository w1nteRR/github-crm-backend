import { Injectable } from '@nestjs/common';
import type { IGitHubProject } from '@custom-types/github/github.types';

const BASE_URL = 'https://api.github.com';

@Injectable()
export class GithubApiService {
  public async fetchProjectByName(name: string): Promise<IGitHubProject> {
    const response = await fetch(`${BASE_URL}/repos/${name}`);
    return (await response.json()) as IGitHubProject;
  }
}
