import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateUserCommand } from './application/application/commands/create-user.command';
import { JwtAuthGuard } from '@libs/auth/validate-token.guard';
import { GetUserQuery } from './application/application/queries/get-user.query';
import { User } from './domain/entities/User';
import { UserMapper } from './user.mapper';
import { IGetUserResponse } from './types/user.types';
import { AuthenticatedRequest } from '@custom-types/network/network.types';

class CreateUserDto {
  email: string;
  password: string;
}

@Controller('api/v1/user')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUser(@Req() req: AuthenticatedRequest): Promise<IGetUserResponse> {
    const user: User = await this.queryBus.execute(
      new GetUserQuery(req['jwt-payload'].email),
    );

    return UserMapper.domainToResponse(user);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    await this.commandBus.execute(
      new CreateUserCommand(createUserDto.email, createUserDto.password),
    );
  }
}
