import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserServices } from './users.service';
import { PRODUCT, Product_Token } from './product.token';
import { loggerProvider } from './Logger/logger.provider';
import { Users } from './users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.schema';

@Module({
    imports: [
        // 定义在当前范围中注册哪些存储库
        TypeOrmModule.forFeature([Users]),
        MongooseModule.forFeature([
            {name: 'UserOne', schema: UserSchema}
        ])
    ],
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
    exports: [TypeOrmModule]
})

export class UserModule {}