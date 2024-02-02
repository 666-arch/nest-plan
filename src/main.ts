import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NextFunction } from 'express';
import { ValidatePipe } from './validate.pipe';
// import { LoginGuard } from './login.guard';
// import { TimeInterceptor } from './time.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('public', {prefix:'/static'}); //useStaticAssets 支持静态资源的请求
  
  app.use((req: Request, res: Response, next: NextFunction)=>{
    console.log('before', req.url);
    next();
    console.log('after');
    
  })

  // app.useGlobalGuards(new LoginGuard())
  // app.useGlobalInterceptors(new TimeInterceptor())
  app.useGlobalPipes(new ValidatePipe());

  await app.listen(3000);

  // setTimeout(()=>{
  //   app.close();
  // }, 3000)

}
bootstrap();

