import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/user.module';

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
