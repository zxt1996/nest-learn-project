import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../authusers/authusers.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
    imports: [UsersModule, PassportModule],
    providers: [AuthService, LocalStrategy],
})

export class AuthModule{}