import { Project } from './entities/Project';

export interface IProjectRepository {
  save(project: Project): Promise<void>;
  delete(project_id: string): Promise<boolean>;
  findById(project_id: string): Promise<Project | null>;
}
