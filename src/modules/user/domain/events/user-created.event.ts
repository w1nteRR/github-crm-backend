import { DomainEvent, DomainEventProps } from '@libs/domain-event.abstract';
import { ICreateUserProps } from '../../types/user.types';

export class UserCreatedEvent extends DomainEvent {
  constructor(props: DomainEventProps<ICreateUserProps>) {
    super(props);
  }
}
