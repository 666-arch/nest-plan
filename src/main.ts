import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('public', {prefix:'/static'}); //useStaticAssets 支持静态资源的请求
  await app.listen(3000);

  setTimeout(()=>{
    app.close();
  }, 3000)
}
bootstrap();

