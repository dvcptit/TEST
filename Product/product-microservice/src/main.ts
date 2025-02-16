import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const configService = app.get(ConfigService);

  // const user = configService.get('RABBITMQ_USER');
  // const password = configService.get('RABBITMQ_PASSWORD');
  // const host = configService.get('RABBITMQ_HOST');
  // const queueName = configService.get('RABBIT_QUEUE_NAME');
  
  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'product_queue',
      queueOptions: {
        durable: true
      },
    },
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Chỉ cho phép các thuộc tính có trong DTO
      forbidNonWhitelisted: true,
  }));
  // await app.listen(process.env.PORT ?? 3000);
  await app.startAllMicroservices();
}
bootstrap();
