import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { moduleComponents } from './components';
import { CustomLoggerService } from './core';
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
export class AppModule {}
