import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8).max(255),
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class CreateUserDto extends createZodDto(CreateUserSchema) {}
