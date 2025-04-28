import { DomainEvent, DomainEventProps } from '@libs/domain-event.abstract';

export class ProjectDeletedEvent extends DomainEvent {
  constructor(props: DomainEventProps<ProjectDeletedEvent>) {
    super(props);
  }
}
