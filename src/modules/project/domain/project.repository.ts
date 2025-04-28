import { Project } from './entities/Project';

export interface IProjectRepository {
  save(project: Project): Promise<void>;
}
