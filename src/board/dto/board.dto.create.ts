import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const BoardCreate = z.object({
  name: z.string().min(1),
  userId: z.number().optional(),
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class CreateBoardDto extends createZodDto(BoardCreate) {}
