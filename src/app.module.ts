import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { GuardModule } from './guardmodule/guard.module';

// 中间件
import { LogMiddleware } from './middlewares/log.middleware';

@Module({
  imports: [
    UserModule,
    GuardModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer
      .apply(LogMiddleware)
      // 排除指定路由
      .exclude(
        { path: 'user/login', method: RequestMethod.GET}
      )
      // .forRoutes('user')
      .forRoutes({ path: 'user', method: RequestMethod.GET })
  }
}
