import { Controller, UseGuards, Post, Body, Request } from '@nestjs/common';
import { CreateBoardDto } from './dto/board.dto.create';
import { BoardService } from './board.service';
import { JwtAuthGuard } from 'src/auth/auth.guard.jwt';
import { JwtPayload } from 'src/auth/types/jwt';

@UseGuards(JwtAuthGuard)
@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Post('/')
  // eslint-disable-next-line @typescript-eslint/require-await
  async create(
    @Body() data: CreateBoardDto,
    @Request() req: Request & { user: JwtPayload },
  ) {
    return this.boardService.create({ ...data, userId: req.user.id });
  }
}
