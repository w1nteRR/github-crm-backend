import { DomainEvent, DomainEventProps } from '@libs/domain-event.abstract';
import { IAuthProps } from '../../types/auth.types';

export class UserSignedInEvent extends DomainEvent {
  constructor(props: DomainEventProps<IAuthProps>) {
    super(props);
  }
}
