import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/user.module';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigService available project-wide
    }),
    TypeOrmModule.forRoot({
      type: 'postgres', // or 'mysql' / 'sqlite'
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'trello-db',
      entities: [User],
      synchronize: true, // ❗ dev only (auto create tables)
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
