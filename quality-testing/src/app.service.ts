import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  hello(id: string): string {
    return `Hello ${id}`;
  }
}
