import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { message: string } {
    return { message: 'Hello world!' };
  }

  getWelcome(): { message: string } {
    return { message: 'Welcome to the test NestJS server.' };
  }
}
