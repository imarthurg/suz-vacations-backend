import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { AuthContextService } from '../services/auth.context';

@Injectable()
export class ContextInterceptor implements NestInterceptor {
  constructor(private authContextService: AuthContextService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    this.authContextService.setUser(request.user);

    return next.handle();
  }
}
