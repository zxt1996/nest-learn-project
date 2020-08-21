import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LogMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next) {
        console.log(`${req.method} ${req.path}`);
        return next();
    }
}