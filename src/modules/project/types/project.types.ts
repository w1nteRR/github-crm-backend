export interface IProjectProps {
  owner: string;
  name: string;
  url: string;
  stars: number;
  forks: number;
  issues: number;
  createdAt: Date;
}

export interface ICreateProjectProps {
  owner: string;
  name: string;
  url: string;
  stars: number;
  forks: number;
  issues: number;
}
