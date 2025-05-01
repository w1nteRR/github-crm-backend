import { ICommand } from '@nestjs/cqrs';

export class CreateProjectCommand implements ICommand {
  constructor(
    public readonly project_name: string,
    public readonly user_id: string,
  ) {}
}
