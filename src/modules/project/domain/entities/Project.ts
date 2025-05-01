import { randomUUID } from 'node:crypto';
import { AggregateRoot } from '@libs/aggregate-root.abstract';
import { AggregateId } from '@libs/entity-base.abstract';
import { ProjectCreatedEvent } from '../events/project-created.event';
import type {
  ICreateProjectProps,
  IProjectProps,
} from '../../types/project.types';
import { ProjectDeletedEvent } from '../events/project-deleted.event';
import { ProjectUpdatedEvent } from '../events/project-updated.event';

export class Project extends AggregateRoot<IProjectProps> {
  protected readonly _id: AggregateId;

  public static create(payload: ICreateProjectProps): Project {
    const id: string = randomUUID();
    const created_at = Date.now();

    const props: ICreateProjectProps = { ...payload };

    const project = new Project({ props: { ...props, created_at }, id });

    project.addEvent(new ProjectCreatedEvent({ aggregateId: id, ...props }));

    return project;
  }

  public delete() {
    this.addEvent(new ProjectDeletedEvent({ aggregateId: this._id }));
  }

  public update(updatedProps: Partial<IProjectProps>): void {
    const newProps = {
      ...this.props,
      ...updatedProps,
    };

    this.setProps(newProps);

    this.addEvent(
      new ProjectUpdatedEvent({
        aggregateId: this._id,
        ...updatedProps,
      }),
    );
  }
}
