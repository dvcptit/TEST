import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ProductModule } from './product/product.module';
import { PurchaseModule } from './purchase/purchase.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27018/db'),
    UserModule,
    ProductModule,
    PurchaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
