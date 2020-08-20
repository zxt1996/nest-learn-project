import { Controller, Get, Param, Post, Body, Header, HttpCode } from '@nestjs/common';
import { UserLoginDTO } from './dto/create-user.dto';
import { UserServices } from './users.service';

interface myParams {
    id: string
}

interface myBody {
    id: string,
    name?: string
}

@Controller('user')
export class UserController {
    // 注入UserServices
    constructor(private readonly userService: UserServices) {}

    @Get('list')
    // 使用@HttpCode(statusCode: number)装饰器设定响应状态码
    @HttpCode(200)
    findAll(): myBody[] {
        return this.userService.findAll();
    }

    // 一旦涉及数据库访问、缓存访问就会存在IO,有IO就会有异步
    @Get('async')
    async findAsync(): Promise<any[]> {
        return Promise.resolve([]);
    }

    @Get(':id')
    // 输出响应头@Header(name:string, value: string)
    @Header('x-version', '1.0.0')
    findOne(@Param() params: myParams): string {
        return `this is your params ${params.id}`;
    }

    @Post()
    findPostAll(@Body() data: myBody): myBody {
        this.userService.create(data);
        return data;
    }

    @Post('login')
    login(@Body() userLoginDTO: UserLoginDTO): string {
        return userLoginDTO.username;
    }
}
