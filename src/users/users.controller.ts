import { Controller, Get, Param, Post, Body, Header, HttpCode, UsePipes, UseInterceptors, Put, Delete } from '@nestjs/common';
import { UserLoginDTO } from './dto/create-user.dto';
import { UserServices } from './users.service';
import { UserPipesDto } from './dto/userLogin.dto';

// 管道
import { ValidatePipe } from 'src/pipes/validate.pipe';

// 拦截器
import { AppInterceptor } from '../interceptors/app.interceptor';
import { ErrorsInterceptor } from '../interceptors/error.interceptor';

interface myParams {
    id: string
}

interface myBody {
    id: string,
    firstName: string,
    lastName: string,
    isActive?: boolean
}

@Controller('user')
@UseInterceptors(AppInterceptor)
export class UserController {
    // 注入UserServices
    constructor(private readonly userService: UserServices) {}

    @Get('list')
    // 使用@HttpCode(statusCode: number)装饰器设定响应状态码
    @HttpCode(200)
    findAll(): Promise<myBody[]> {
        return this.userService.findAll();
    }

    // 一旦涉及数据库访问、缓存访问就会存在IO,有IO就会有异步
    @Get('async')
    async findAsync(): Promise<any[]> {
        return Promise.resolve([]);
    }

    // @Get(':id')
    // // 输出响应头@Header(name:string, value: string)
    // @Header('x-version', '1.0.0')
    // findOne(@Param() params: myParams): string {
    //     return `this is your params ${params.id}`;
    // }

    @Post()
    findPostAll(@Body() data: myBody): myBody {
        this.userService.create(data);
        return data;
    }

    @Post('login')
    login(@Body() userLoginDTO: UserLoginDTO): string {
        return userLoginDTO.username;
    }

    @Post('pipe')
    @UsePipes(ValidatePipe)
    @UseInterceptors(ErrorsInterceptor)
    loginPip(@Body() userPipesDto: UserPipesDto) {
        return {
            errcode: 0,
            errmsg: 'ok'
        }
    }

    @Put()
    update(@Body() user: myBody) {
        return this.userService.updateUser(user);
    }

    @Get(':id')
    getOne(@Param() params) {
        return this.userService.findOne(params.id);
    }

    @Get('all')
    getAll() {
        return this.userService.findAll();
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.userService.remove(params.id);
    }
}
