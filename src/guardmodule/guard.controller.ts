import { Post, Get, UseGuards, Controller } from '@nestjs/common';
import {TokenGuard} from '../guards/token.guard';

@Controller('guard')
export class GuardController {
    @Post('login')
    login() {
        return {
            token: 'fake_token'
        }
    }

    @Get('info')
    @UseGuards(TokenGuard)
    info() {
        return {
            username: 'fake_name'
        }
    }
}