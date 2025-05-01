import { Project } from './entities/Project';
import {
  DeleteProjectProps,
  GetProjectProps,
  ProjectEditProps,
  ProjectList,
} from '../types/project.types';

export interface IProjectRepository {
  save(project: Project, user_id: string): Promise<void>;
  delete(props: DeleteProjectProps): Promise<void>;
  update(project: ProjectEditProps, user_id: string): Promise<Project>;
  findById(props: GetProjectProps): Promise<Project | null>;
  findMany(user_id: string): Promise<ProjectList>;
}
