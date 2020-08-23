import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/error.filter';
import { AppInterceptor } from './interceptors/app.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局拦截器
  app.useGlobalInterceptors(new AppInterceptor());
  await app.listen(3000);
}
bootstrap();
