import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      const result = this.schema.safeParse(value);

      if (!result.success) {
        const formattedErrors = result.error.format();

        throw new BadRequestException({
          message: 'Validation failed',
          errors: formattedErrors,
        });
      }

      return result.data as unknown;
    } catch (error) {
      console.log('zod_validation_error', error);
      throw new BadRequestException('Validation failed');
    }
  }
}
