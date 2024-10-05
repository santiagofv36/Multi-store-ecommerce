import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLoggerService, LoggingInterceptor } from './core';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(CustomLoggerService);
  app.useLogger(logger);
  app.useGlobalInterceptors(new LoggingInterceptor(logger));

  app.setGlobalPrefix(`api/${process.env.API_VERSION!}`);

  app.enableCors({
    origin: JSON.parse(process.env.CORS_ORIGINS ?? '["*"]'),
    credentials: true,
  });

  await app.listen(process.env.PORT!);
}
bootstrap();
