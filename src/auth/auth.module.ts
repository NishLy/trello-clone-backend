import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './auth.jwt.strategy';
import { LocalStrategy } from './auth.local.strategy';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/user.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule, // Make sure ConfigModule is imported
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') ?? 'secret',
        signOptions: { expiresIn: '60m' },
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController], // Add the controller here
  exports: [AuthService],
})
export class AuthModule {}
