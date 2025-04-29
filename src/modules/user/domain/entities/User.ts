import { randomUUID } from 'node:crypto';
import { AggregateRoot } from '@libs/aggregate-root.abstract';
import { AggregateId } from '@libs/entity-base.abstract';
import { ICreateUserProps, IUserProps } from '../../types/user.types';
import { UserCreatedEvent } from '../events/user-created.event';

export class User extends AggregateRoot<IUserProps> {
  protected readonly _id: AggregateId;

  public static create(createUserProps: ICreateUserProps): User {
    const id: string = randomUUID();
    const props: IUserProps = { ...createUserProps };

    const user = new User({ props, id });

    user.addEvent(new UserCreatedEvent({ aggregateId: id, ...props }));

    return user;
  }
}
