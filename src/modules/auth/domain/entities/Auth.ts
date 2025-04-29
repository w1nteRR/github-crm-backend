import { randomUUID } from 'node:crypto';
import { AggregateRoot } from '@libs/aggregate-root.abstract';
import { AggregateId } from '@libs/entity-base.abstract';
import { IAuthProps, ISignInProps, ISignUpProps } from '../../types/auth.types';
import { PasswordHash } from './value-objects/Password-hash.vo';
import { UserSignedUpEvent } from '../events/user-signed-up.event';
import { UnauthorizedException } from '@nestjs/common';
import { UserSignedInEvent } from '../events/user-signed-in.event';

export class Auth extends AggregateRoot<IAuthProps> {
  protected readonly _id: AggregateId;

  public static signUp(signUpProps: ISignUpProps): Auth {
    const id: string = randomUUID();

    const authProps: IAuthProps = {
      email: signUpProps.email,
      password_hash: PasswordHash.create(signUpProps.password),
    };

    const auth = new Auth({ id, props: { ...authProps } });

    auth.addEvent(new UserSignedUpEvent({ aggregateId: id, ...authProps }));

    return auth;
  }

  public async signIn(
    signInProps: ISignInProps,
    compare: (plain: string, hash: string) => Promise<boolean>,
  ): Promise<void> {
    const isValid = await compare(
      signInProps.password,
      this.props.password_hash.getValue(),
    );

    if (!isValid) {
      throw new UnauthorizedException();
    }

    this.addEvent(
      new UserSignedInEvent({
        aggregateId: this._id,
        ...this.props,
      }),
    );
  }

  public signOut() {}
}
