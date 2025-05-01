import { DomainEvent, DomainEventProps } from '@libs/domain-event.abstract';
import { IProjectProps } from '../../types/project.types';

export class ProjectUpdatedEvent extends DomainEvent {
  constructor(props: DomainEventProps<Partial<IProjectProps>>) {
    super(props);
  }
}
