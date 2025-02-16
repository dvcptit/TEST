declare const module: any;
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationError } from 'class-validator';
import { HttpExceptionFilter } from 'test/httpfilter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Chỉ cho phép các thuộc tính có trong DTO
      forbidNonWhitelisted: true,
      exceptionFactory: (validationErrors: ValidationError[] = [])=>{
        return new BadRequestException(
          validationErrors.map((error) => ({
            [error.property]: Object.values(error.constraints),
          })),
        );
      }
  }));

  const config = new DocumentBuilder()
    .setTitle('Quiz manager API')
    .setDescription('Quiz manager API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
