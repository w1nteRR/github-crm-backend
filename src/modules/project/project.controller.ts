import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProjectCommand } from './application/commands/create-project.command';

@Controller('project')
export class ProjectController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  async createProject(@Body() { project_name }: { project_name: string }) {
    await this.commandBus.execute(new CreateProjectCommand(project_name));
  }
}
