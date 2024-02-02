import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { OtherService } from './other/other.service';

@Controller()
export class AppController {
  constructor(
    // private readonly appService: AppService
    @Inject('app_service') private readonly appService: AppService,
    // @Inject('person') private readonly person: { name: string; age: number },
    @Inject('person2') private readonly person2: { name: string; desc: string}
  ) { }

  @Inject(OtherService)
  private otherService: OtherService;


  @Get()
  getHello(): string {
<<<<<<< HEAD
    debugger
=======
    // console.log(this.person2);
    console.log('handler...');
    
>>>>>>> a9243ff8d3c0c1f59fce02fa327a2473e85a06fe
    return this.appService.getHello() + this.otherService.xxx();
  }

  @Get('aaa')
  aaa(): string{
    console.log('aaa...');
    
    return 'aaa'
  }

  @Get('bbb')
  bbb(): string{
    console.log('bbb...');
    
    return 'bbb';
  }
}

