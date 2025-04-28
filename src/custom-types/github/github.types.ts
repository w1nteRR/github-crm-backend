export interface IGitHubProject {
  id: number;
  name: string;
  full_name: string;
  owner: IGitHubProjectOwner;
  url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  created_at: Date;
}

export interface IGitHubProjectOwner {
  login: string;
  id: number;
}
