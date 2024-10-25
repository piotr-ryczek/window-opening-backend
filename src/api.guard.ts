import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ApiGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const { headers } = request;

    if (!headers) {
      return false;
    }

    const appSecret = headers['app-secret'];

    if (!appSecret) {
      return false;
    }

    if (process.env.APP_SECRET !== appSecret) {
      return false;
    }

    return true;
  }
}
