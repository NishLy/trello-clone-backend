import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const PanelCreate = z.object({
  name: z.string().min(1),
  boardId: z.number(),
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class CreatePanelDto extends createZodDto(PanelCreate) {}
