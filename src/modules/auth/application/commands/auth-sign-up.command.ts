import { ICommand } from '@nestjs/cqrs';

export class AuthSignUpCommand implements ICommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}
