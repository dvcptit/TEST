import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'purchase_queue',
      queueOptions: {
        durable: true
      },
    },
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Chỉ cho phép các thuộc tính có trong DTO
      forbidNonWhitelisted: true,
  }));
  await app.startAllMicroservices();
}
bootstrap();
