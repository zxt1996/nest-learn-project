import { Injectable } from '@nestjs/common';
import { UsersService } from '../authusers/authusers.service';
import { JwtService } from '@nestjs/jwt';
import { sign } from 'crypto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ){}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result} = user;
            return result;
        }

        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        // sign()函数用于从用户对象属性的子集生成jwt
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}