import { IQuery } from '@nestjs/cqrs';

export class GetUserProjectsQuery implements IQuery {
  constructor(public readonly user_id: string) {}
}
