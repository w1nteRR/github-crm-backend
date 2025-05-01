import { IProjectRepository } from '../domain/project.repository';
import { Project } from '../domain/entities/Project';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@libs/external/prisma/prisma.service';
import { ProjectMapper } from '../project.mapper';
import {
  DeleteProjectProps,
  GetProjectProps,
  ProjectEditProps,
  ProjectList,
} from '../types/project.types';
import { Project as PrismaProject } from '../../../../generated/prisma';

@Injectable()
export class ProjectRepositoryImpl implements IProjectRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: ProjectMapper,
  ) {}

  public async save(project: Project, user_id: string): Promise<void> {
    await this.prisma.project.create({
      data: { ...this.mapper.fromDomainToPrisma(project), user_id },
    });
  }

  public async delete(props: DeleteProjectProps): Promise<void> {
    const { project_id, user_id } = props;
    await this.prisma.project.delete({ where: { id: project_id, user_id } });
  }

  public async findById(props: GetProjectProps): Promise<Project | null> {
    const { project_id, user_id } = props;

    const project: PrismaProject | null = await this.prisma.project.findFirst({
      where: { id: project_id, user_id },
    });

    if (!project) return null;

    return this.mapper.fromPrismaToDomain(project);
  }

  public async findMany(user_id: string): Promise<ProjectList> {
    return this.prisma.project.findMany({
      where: { user_id },
    });
  }

  public async update(
    project: ProjectEditProps,
    user_id: string,
  ): Promise<Project> {
    const updatedProject: PrismaProject = await this.prisma.project.update({
      where: { id: project.id, user_id },
      data: project,
    });

    return this.mapper.fromPrismaToDomain(updatedProject);
  }
}
