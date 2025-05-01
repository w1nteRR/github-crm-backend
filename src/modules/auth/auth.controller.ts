import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthSignUpCommand } from './application/commands/auth-sign-up.command';
import { ZodValidationPipe } from '@libs/validation/zod-validation.pipe';
import { AuthSignUpDto, authSignUpSchema } from './dto/auth-sign-up.schema';
import { AuthSignInCommand } from './application/commands/auth-sign-in.command';
import { AuthSignInDto, authSignInSchema } from './dto/auth-sign-in.schema';
import { Tokens } from '@custom-types/jwt/token.types';
import { RefreshTokenCommand } from './application/commands/refresh-token.command';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('sign-up')
  @UsePipes(new ZodValidationPipe(authSignUpSchema))
  async signUp(@Body() authSignUpDto: AuthSignUpDto): Promise<void> {
    const { email, password } = authSignUpDto;

    await this.commandBus.execute(new AuthSignUpCommand(email, password));
  }

  @Post('sign-in')
  @UsePipes(new ZodValidationPipe(authSignInSchema))
  async signIn(
    @Body() authSignInDto: AuthSignInDto,
  ): Promise<{ tokens: Tokens }> {
    const { email, password } = authSignInDto;

    const tokens: Tokens = await this.commandBus.execute(
      new AuthSignInCommand(email, password),
    );

    return { tokens };
  }

  @Post('refresh')
  async refresh(
    @Body() body: { refreshToken: string },
  ): Promise<{ tokens: Tokens }> {
    const tokens: Tokens = await this.commandBus.execute(
      new RefreshTokenCommand(body.refreshToken),
    );

    return {
      tokens,
    };
  }
}
