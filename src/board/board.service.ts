import { Injectable } from '@nestjs/common';
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
