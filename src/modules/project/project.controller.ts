import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProjectCommand } from './application/commands/create-project.command';
import { JwtAuthGuard } from '@libs/auth/validate-token.guard';
import { AuthenticatedRequest } from '@custom-types/network/network.types';

@Controller('api/v1/project')
export class ProjectController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProject(
    @Req() req: AuthenticatedRequest,
    @Body() { project_name }: { project_name: string },
  ) {
    await this.commandBus.execute(new CreateProjectCommand(project_name));
  }
}
