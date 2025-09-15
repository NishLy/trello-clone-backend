import {
  Controller,
  UseGuards,
  Post,
  Body,
  Request,
  Delete,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/board.dto.create';
import { BoardService } from './board.service';
import { JwtAuthGuard } from 'src/auth/auth.guard.jwt';
import { JwtPayload } from 'src/auth/types/jwt';
import { ResponseService } from 'src/common/services/response.service';

@UseGuards(JwtAuthGuard)
@Controller('board')
export class BoardController {
  constructor(
    private boardService: BoardService,
    private response: ResponseService,
  ) {}

  @Post('/')
  // eslint-disable-next-line @typescript-eslint/require-await
  async create(
    @Body() data: CreateBoardDto,
    @Request() req: Request & { user: JwtPayload },
  ) {
    const board = this.boardService.create({ ...data, userId: req.user.id });
    return this.response.success('Board created successfully', board);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateBoardDto>,
    @Request() req: Request & { user: JwtPayload },
  ) {
    const board = await this.boardService.update(id, dto, req.user.id);
    return this.response.success('Board updated successfully', board);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: number,
    @Request() req: Request & { user: JwtPayload },
  ) {
    await this.boardService.remove(id, req.user.id);
    return this.response.success('Board deleted successfully');
  }
}
