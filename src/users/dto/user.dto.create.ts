import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8).max(255),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
