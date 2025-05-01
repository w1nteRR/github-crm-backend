import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProjectCommand } from './application/commands/create-project.command';
import { JwtAuthGuard } from '@libs/auth/validate-token.guard';
import { AuthenticatedRequest } from '@custom-types/network/network.types';
import { GetUserProjectsQuery } from './application/queries/get-user-projects.query';
import { DeleteProjectCommand } from './application/commands/delete-project.command';
import { ProjectEditProps, ProjectList } from './types/project.types';
import { UpdateProjectCommand } from './application/commands/update-project.command';

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
    const { sub } = req['jwt-payload'];
    await this.commandBus.execute(new CreateProjectCommand(project_name, sub));
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async getProjects(
    @Req() req: AuthenticatedRequest,
  ): Promise<{ list: ProjectList }> {
    const { sub } = req['jwt-payload'];

    const projects: ProjectList = await this.queryBus.execute(
      new GetUserProjectsQuery(sub),
    );

    return { list: projects };
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteProject(
    @Req() req: AuthenticatedRequest,
    @Body() { project_id }: { project_id: string },
  ): Promise<void> {
    const { sub } = req['jwt-payload'];
    await this.commandBus.execute(new DeleteProjectCommand(project_id, sub));
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateProject(
    @Req() req: AuthenticatedRequest,
    @Body() body: { project: ProjectEditProps },
  ) {
    const { sub } = req['jwt-payload'];
    await this.commandBus.execute(new UpdateProjectCommand(body.project, sub));
  }
}
