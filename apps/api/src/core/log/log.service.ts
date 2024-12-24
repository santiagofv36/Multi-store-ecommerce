import { Injectable, ConsoleLogger } from '@nestjs/common';
@Injectable()
export class CustomLoggerService extends ConsoleLogger {
  log(origin: string, message: string): void {
    super.verbose('\x1b[34m[' + origin + '] ' + '\x1b[36m' + message);
  }

  error(origin: string, message: string, trace?: string): void {
    super.error('\x1b[31m[' + origin + '] ' + '\x1b[31m' + message, trace);
  }

  warn(origin: string, message: string): void {
    super.warn('\x1b[33m[' + origin + '] ' + '\x1b[36m' + message);
  }

  debug(origin: string, message: string): void {
    super.debug('\x1b[34m[' + origin + '] ' + '\x1b[36m' + message);
  }

  verbose(origin: string, message: string): void {
    super.log('\x1b[35m[' + origin + '] ' + '\x1b[35m' + message);
  }
}
