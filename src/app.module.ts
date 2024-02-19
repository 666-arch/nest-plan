import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XxxModule } from './xxx/xxx.module';
import { PersonModule } from './person/person.module';
import { OtherModule } from './other/other.module';
import { AaaModule } from './aaa/aaa.module';
import { BbbModule } from './bbb/bbb.module';
import { CccModule } from './ccc/ccc.module';
import { DddModule } from './ddd/ddd.module';
import { LogMiddleware } from './log.middleware';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';

@Global()
@Module({
  imports: [XxxModule, PersonModule, OtherModule, AaaModule, BbbModule, CccModule, DddModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeInterceptor
    },
    {
      provide: APP_PIPE,
      useClass: ValidatePipe
    },
    {
      provide: APP_FILTER,
      useClass: TestFilter
    },
    {
      provide: 'app_service',
      useClass: AppService,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: LoginGuard
    // },
    // {
    //   provide:'person',
    //   useValue:{
    //     name:'aaa',
    //     age:20
    //   }
    // },
    {
      provide: 'person2',
      useFactory() {
        return {
          name: 'bbb',
          desc: 'ccc'
        }
      }
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('aaa*')
  }
}
