import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const AuthLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(255),
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class AuthLoginDto extends createZodDto(AuthLoginSchema) {}
