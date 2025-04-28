import { IProjectRepository } from '../domain/project.repository';

export class ProjectRepositoryImpl implements IProjectRepository {
  save(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
