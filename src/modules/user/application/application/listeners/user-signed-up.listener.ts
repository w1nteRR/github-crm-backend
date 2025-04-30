import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { OnEvent } from '@nestjs/event-emitter';
import { UserSignedUpEvent } from '../../../../auth/domain/events/user-signed-up.event';
import { CreateUserCommand } from '../commands/create-user.command';

@Injectable()
export class UserSignedUpListener {
  constructor(private readonly commandBus: CommandBus) {}

  @OnEvent(UserSignedUpEvent.name)
  async handleUserSignedUp(event: UserSignedUpEvent): Promise<void> {
    const { email, password_hash } = event;

    await this.commandBus.execute(
      new CreateUserCommand(email, password_hash.getValue()),
    );
  }
}
