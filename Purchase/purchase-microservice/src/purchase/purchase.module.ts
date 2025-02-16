import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { PurchaseSchema } from './purchase.schema';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Purchase', schema: PurchaseSchema }]),
      ],
    providers: [PurchaseService],
    controllers: [PurchaseController],
    exports:[PurchaseService]
})
export class PurchaseModule {}
