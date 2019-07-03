import { Injectable, OnModuleInit, OnModuleDestroy  } from '@nestjs/common';
import { FetchBuildService } from './shared/fetch-build.service';

@Injectable()
export class AppService  {

  getHello(): string {
    return 'Hello World';
  }
}
