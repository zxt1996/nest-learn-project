// 异常拦截器

import { Catch, HttpException, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Request, Response} from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
    // ArgumentsHost是原始请求的包装器,包装了HTTP/GRPC/WebSocket三种请求
    // 处理WebSocket异常,使用host.switchToWs()
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        // 记录日志
        console.log("记录日志", request.method, request.url, exception.message);
        // 发送响应
        response
            .status(status)
            .json({
                statusCode: status,
                message: exception.message,
                path: request.url
            })
    }
}