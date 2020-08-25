import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            // 提供从请求中提取JWT的方法
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // 确保JWT没有过期的责任委托给Passport模块
            ignoreExpiration: false,
            // 密钥
            secretOrKey: jwtConstants.secret,
        })
    }

    async validate(payload: any) {
        console.log({
            userId: payload.sub,
            username: payload.username
        })
        return {
            userId: payload.sub,
            username: payload.username
        }
    }
}