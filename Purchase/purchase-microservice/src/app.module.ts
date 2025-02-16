import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PurchaseModule } from './purchase/purchase.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27018/db'),
    PurchaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}