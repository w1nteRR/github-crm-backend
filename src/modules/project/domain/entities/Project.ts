import { randomUUID } from 'node:crypto';
import { AggregateRoot } from '@libs/aggregate-root.abstract';
import { AggregateId } from '@libs/entity-base.abstract';
import { ProjectCreatedEvent } from '../events/project-created.event';
import type {
  ICreateProjectProps,
  IProjectProps,
} from '../../types/project.types';
import { ProjectDeletedEvent } from '../events/project-deleted.event';

export class Project extends AggregateRoot<IProjectProps> {
  protected readonly _id: AggregateId;

  public static create(payload: ICreateProjectProps): Project {
    const id: string = randomUUID();
    const createdAt: Date = new Date();

    const props: ICreateProjectProps = { ...payload };

    const project = new Project({ props: { ...props, createdAt }, id });

    project.addEvent(new ProjectCreatedEvent({ aggregateId: id, ...props }));

    return project;
  }

  public delete() {
    this.addEvent(new ProjectDeletedEvent({ aggregateId: this._id }));
  }
}
