import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealtCheck(): string {
    return "I'm healthy!";
  }
}
