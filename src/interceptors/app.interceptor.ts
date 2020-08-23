import { Injectable, NestInterceptor, Logger, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';
import { format } from 'util';

@Injectable()
export class AppInterceptor implements NestInterceptor {
    // 实例化日志记录器
    private readonly logger = new Logger();

    // CallHandler接口的handle()返回值是RxJs的Observable对象
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const start = Date.now();

        // 如果在拦截器中调用了next.handle()方法就会执行对应的路由处理函数
        // 如果不调用的话就不会执行
        return next.handle().pipe(tap((response) => {
            // 调用完handle()后得到RxJS响应对象,使用tap可以得到路由函数的返回值
            const host = context.switchToHttp();
            const request = host.getRequest<Request>();

            // format返回一个格式化后的字符串
            this.logger.log(format(
                '%s %s %dms %s',
                request.method,
                request.url,
                Date.now() - start,
                JSON.stringify(response),
            ))
        }))
    }
}