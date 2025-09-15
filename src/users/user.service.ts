import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/user.dto.create';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  findAll() {
    return this.usersRepo.find();
  }

  create(data: CreateUserDto) {
    const user = this.usersRepo.create(data);
    return this.usersRepo.save(user);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (user && (await user.comparePassword(password))) {
      return user;
    }
    return null;
  }

  findById(id: number) {
    return this.usersRepo.findOne({ where: { id } });
  }
}
