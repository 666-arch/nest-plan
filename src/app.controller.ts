import { Controller, Get, Inject, Optional, Query, UseFilters, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { OtherService } from './other/other.service';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';

@Controller()
// @UseInterceptors(TimeInterceptor)
@UsePipes(ValidatePipe)
// @UseFilters(TestFilter)
export class AppController {

  @Optional()
  // @Inject('app_service') private readonly appService: AppService
  @Inject('person2') private readonly person2: { name: string; desc: string }
  constructor(
    // private readonly appService: AppService
    // @Inject('person') private readonly person: { name: string; age: number },
    @Optional() private appService: AppService
  ) { }

  @Inject(OtherService)
  private otherService: OtherService;


  @Get()
  getHello(): string {
    console.log('handler...');
    return this.appService.getHello() + this.otherService.xxx();
  }

  @Get('aaa')
  @UseGuards(LoginGuard)
  aaa(): string {
    console.log('aaa...');

    return 'aaa'
  }

  @Get('bbb')
  @UseInterceptors(TimeInterceptor)
  bbb(): string {
    console.log('bbb...');

    return 'bbb';
  }

  @Get('ccc')
  @UseFilters(TestFilter)
  ccc(@Query('num', ValidatePipe) num: number) {
    return num + 1;
  }
}

