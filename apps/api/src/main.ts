import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(`api/${process.env.API_VERSION!}`);

  app.enableCors({
    // origin: JSON.parse(process.env.CORS_ORIGINS ?? '["*"]'), // TODO: change for a environment variable
    origin: '*',
    // methods: 'GET,POST,PUT,DELETE,PATCH',
    // preflightContinue: false,
    // allowedHeaders: 'Content Type, Accept',
    credentials: true,
  });

  await app.listen(process.env.PORT!);
}
bootstrap();
