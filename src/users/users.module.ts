import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserServices } from './users.service';
import { PRODUCT, Product_Token } from './product.token';
import { loggerProvider } from './Logger/logger.provider';

@Module({
    controllers: [UserController],
    providers: [
        UserServices,
        // 自定义provider,使用值
        {
            provide: PRODUCT,
            useValue: Product_Token
        },
        loggerProvider
    ],
})

export class UserModule {}