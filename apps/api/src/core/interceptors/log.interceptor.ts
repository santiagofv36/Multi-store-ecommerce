import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { CustomLoggerService } from '../log'; // Adjust the path as necessary

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: CustomLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const targetClass = context.getClass().name;
    const targetMethod = context.getHandler().name;

    // Log the execution start
    this.logger.log(
      `${targetClass}.${targetMethod}`,
      `Executing at ${new Date().toISOString()}`,
    );

    return next.handle().pipe(
      tap(() => {
        this.logger.verbose(
          `${targetClass}.${targetMethod}`,
          `Successfully executed in ${Date.now() - now}ms`,
        );
      }),
      catchError((err) => {
        this.logger.error(
          `${targetClass}.${targetMethod}`,
          `Error: ${err.message}`,
          err.stack,
        );
        return throwError(() => err);
      }),
    );
  }
}
