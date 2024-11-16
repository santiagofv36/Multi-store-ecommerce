import { HttpModule } from '@nestjs/axios';
import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { moduleComponents } from './components';
import { CustomLoggerService } from './core';
import { HttpAdapterHost } from '@nestjs/core';
import { app } from './core';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    MongooseModule.forRoot(process.env.DB_URI!),
    ...moduleComponents,
  ],
  providers: [CustomLoggerService],
  exports: [CustomLoggerService],
  controllers: [],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly logger: CustomLoggerService,
    private readonly httpAdapterHost: HttpAdapterHost, // Inject HttpAdapterHost
  ) {}

  onModuleInit() {
    const { httpAdapter } = this.httpAdapterHost;

    // Ensure we are dealing with an Express adapter
    const expressInstance = httpAdapter.getInstance();
    if (!expressInstance) {
      this.logger.error('AppModule', 'No Express instance found');
      return;
    }

    this.logger.verbose(
      'AppModule',
      'Express instance found, mounting sub-app',
    );

    // Mount the Express sub-app on a specific route
    expressInstance.use('/api/v1/express', app);

    this.logger.verbose('AppModule', 'Mounted Express sub-app at /express');
  }
}
