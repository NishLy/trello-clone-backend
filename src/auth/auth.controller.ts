import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth.dto.login';

@Controller('auth')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() dto: AuthLoginDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const user = await this.authService.validateUser(dto.email, dto.password);

    if (user) {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
  }
}
