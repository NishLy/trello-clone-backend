import { Panel } from 'src/panel/panel.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // One board -> many panels
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @OneToMany(() => Panel, (panel) => panel.board, { cascade: true })
  panels: Panel[];

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @ManyToOne(() => User, (user) => user.boards, { onDelete: 'CASCADE' })
  user: User;
}
