import { ICommand } from '@nestjs/cqrs';
import { ProjectEditProps } from '../../types/project.types';

export class UpdateProjectCommand implements ICommand {
  constructor(
    public readonly project_props: ProjectEditProps,
    public readonly user_id: string,
  ) {}
}
