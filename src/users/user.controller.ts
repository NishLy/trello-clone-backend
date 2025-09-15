import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/user.dto.create';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }
}
