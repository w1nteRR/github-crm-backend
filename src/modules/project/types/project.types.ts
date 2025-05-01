export interface IProjectProps {
  owner: string;
  name: string;
  url: string;
  stars: number;
  forks: number;
  issues: number;
  created_at: number;
}

export interface ICreateProjectProps {
  owner: string;
  name: string;
  url: string;
  stars: number;
  forks: number;
  issues: number;
}

interface IBaseProjectOperationProps {
  project_id: string;
  user_id: string;
}

export type DeleteProjectProps = IBaseProjectOperationProps;
export type GetProjectProps = IBaseProjectOperationProps;
export type ProjectEditProps = IProjectProps & { id: string };

export type ProjectList = Array<
  IProjectProps & { id: string; user_id: string }
>;
