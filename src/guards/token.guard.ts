import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import {GuardService} from '../guardmodule/guard.service';
import { Observable } from 'rxjs';

// 路由守卫在所有中间件执行完毕后开始执行
// 只能返回true或false来决定放行/阻断当前请求
@Injectable()
export class TokenGuard implements CanActivate {
    constructor(private readonly guardService: GuardService){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        // 读取token
        const authorization = request.headers['authorization'];
        if (!authorization) {
            return false;
        }
        return this.guardService.validateToken(authorization);
    }
}