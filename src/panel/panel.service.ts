import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Panel } from './panel.entity';
import { CreatePanelDto } from './dto/panel.dto.create';

@Injectable()
export class PanelService {
  constructor(
    @InjectRepository(PanelService) private panelsRepo: Repository<Panel>,
  ) {}

  findAll() {
    return this.panelsRepo.find();
  }

  async createPanel(data: CreatePanelDto) {
    const panel = this.panelsRepo.create({
      ...data,
      board: { id: data.boardId },
    });
    return await this.panelsRepo.save(panel);
  }

  async createManyPanels(data: CreatePanelDto[]) {
    const panels = this.panelsRepo.create(
      data.map((dto) => ({
        ...dto,
        board: { id: dto.boardId },
      })),
    );

    return await this.panelsRepo.save(panels);
  }

  findById(id: number) {
    return this.panelsRepo.findOne({ where: { id } });
  }

  findByBoardId(id: number) {
    return this.panelsRepo.find({
      where: { board: { id } },
      order: { id: 'DESC' },
      relations: ['board'],
    });
  }
}
