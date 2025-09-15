import { Board } from 'src/board/board.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Panel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  order: number;

  // Many panels -> one board
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @ManyToOne(() => Board, (board) => board.panels, { onDelete: 'CASCADE' })
  board: Board;
}
