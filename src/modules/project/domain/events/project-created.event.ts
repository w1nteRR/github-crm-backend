import { DomainEvent, DomainEventProps } from '@libs/domain-event.abstract';
import { ICreateProjectProps } from '../../types/project.types';

export class ProjectCreatedEvent extends DomainEvent {
  constructor(props: DomainEventProps<ICreateProjectProps>) {
    super(props);
  }
}
