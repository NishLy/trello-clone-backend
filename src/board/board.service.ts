import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/board.dto.create';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardsRepo: Repository<Board>,
  ) {}

  findAll() {
    return this.boardsRepo.find();
  }

  create(data: CreateBoardDto) {
    const board = this.boardsRepo.create({
      ...data,
      user: { id: data.userId! },
    });
    return this.boardsRepo.save(board);
  }

  async update(id: number, data: Partial<CreateBoardDto>, userId: number) {
    const board = await this.boardsRepo.preload({
      id,
      ...data,
      user: { id: userId }, // ensure ownership if needed
    });

    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }

    return this.boardsRepo.save(board);
  }

  async remove(id: number, userId: number) {
    const board = await this.boardsRepo.findOne({
      where: { id, user: { id: userId } },
    });

    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found or not yours`);
    }

    return this.boardsRepo.remove(board);
  }

  findById(id: number) {
    return this.boardsRepo.findOne({ where: { id } });
  }

  findByUserId(id: number) {
    return this.boardsRepo.find({
      where: { user: { id } },
      order: { id: 'DESC' },
      relations: ['board'],
    });
  }
}
