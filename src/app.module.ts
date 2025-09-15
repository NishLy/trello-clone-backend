import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // or 'mysql' / 'sqlite'
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'testdb',
      entities: [User],
      synchronize: true, // ❗ dev only (auto create tables)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
