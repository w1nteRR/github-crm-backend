import { DomainEvent, DomainEventProps } from '@libs/domain-event.abstract';
import { IAuthProps } from '../../types/auth.types';
import { PasswordHash } from '../entities/value-objects/Password-hash.vo';

export class UserSignedUpEvent extends DomainEvent {
  readonly email: string;
  readonly password_hash: PasswordHash;

  constructor(props: DomainEventProps<IAuthProps>) {
    super(props);
    this.email = props.email;
    this.password_hash = props.password_hash;
  }
}
