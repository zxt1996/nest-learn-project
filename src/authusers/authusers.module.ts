import { Module } from '@nestjs/common';
import { UsersService } from './authusers.service';

@Module({
    providers: [UsersService],
    exports: [UsersService],
})

export class UsersModule {};