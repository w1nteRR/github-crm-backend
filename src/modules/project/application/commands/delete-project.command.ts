import { ICommand } from '@nestjs/cqrs';

export class DeleteProjectCommand implements ICommand {
  constructor(public readonly project_id: string) {}
}
