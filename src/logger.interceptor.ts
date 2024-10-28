import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body } = request;

    console.log(`Incoming request: ${method} ${url}`);
    console.log(`Body: `, body);

    return next.handle().pipe(
      tap((data) => {
        const response = context.switchToHttp().getResponse();
        console.log(`Outgoing response: ${response.statusCode}`);
      })
    );
  }
}