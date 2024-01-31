import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XxxModule } from './xxx/xxx.module';
import { PersonModule } from './person/person.module';
import { OtherModule } from './other/other.module';
import { AaaModule } from './aaa/aaa.module';
import { BbbModule } from './bbb/bbb.module';

@Module({
  imports: [XxxModule, PersonModule, OtherModule, AaaModule, BbbModule],
  controllers: [AppController],
  providers: [{
    provide:'app_service',
    useClass: AppService,
  },
  // {
  //   provide:'person',
  //   useValue:{
  //     name:'aaa',
  //     age:20
  //   }
  // },
  {
    provide:'person2',
    useFactory(){
      return {
        name:'bbb',
        desc:'ccc'
      }
    }
  }],
})
export class AppModule {}
