import { Injectable, Scope, Inject } from '@nestjs/common';
import { PRODUCT, Product } from './product.token';
import { Logger } from './Logger/logger';

interface User {
    id: string,
    name?: string
}
// services层用来写业务逻辑
// REQUEST每个 请求初始化一次
// @Injectable({scope: Scope.REQUEST})
// TRANSIENT每次注入都会实例化
// @Injectable({scope: Scope.TRANSIENT})
// 默认情况下是单例模式,整个应用内只存在一份实例
@Injectable()
export class UserServices {
    constructor(@Inject(PRODUCT) product: Product, @Inject(`Logger`) readonly logger: Logger) {
        console.log(product.endPoint);
        logger.log('nowLog is ');
    }
    private readonly users: User[] = [];

    create (user: User): string {
        this.users.push(user);
        return 'success';
    }

    findAll(): User[] {
        return this.users;
    }
}