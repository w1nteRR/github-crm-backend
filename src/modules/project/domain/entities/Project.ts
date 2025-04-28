import { randomUUID } from 'node:crypto';
import { AggregateRoot } from '@libs/aggregate-root.abstract';
import { AggregateId } from '@libs/entity-base.abstract';
import { ProjectCreatedEvent } from '../events/project-created.event';
import type {
  ICreateProjectProps,
  IProjectProps,
} from '../../types/project.types';

export class Project extends AggregateRoot<IProjectProps> {
  protected _id: AggregateId;

  public static create(payload: ICreateProjectProps): Project {
    const id: string = randomUUID();
    const createdAt: Date = new Date();

    const props: ICreateProjectProps = { ...payload };

    const project = new Project({ props: { ...props, createdAt }, id });

    project.addEvent(new ProjectCreatedEvent({ aggregateId: id, ...props }));

    return project;
  }
}
