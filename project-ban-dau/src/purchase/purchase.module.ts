import { ConfigModule, ConfigService } from "@nestjs/config";
import { PurchaseController } from "./purchase.controller";
import { ClientProxy, ClientProxyFactory } from "@nestjs/microservices";
import { Transport } from "@nestjs/microservices";

import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { ProductModule } from "src/product/product.module";


@Module({
    imports: [ConfigModule, UserModule, ProductModule],
    controllers: [PurchaseController],
    providers:[
        {
            provide: 'PURCHASE_SERVICE',
            useFactory: (configService: ConfigService) => {
                return ClientProxyFactory.create({
                    transport: Transport.RMQ,
                    options: {
                        urls: ['amqp://localhost:5672'],
                        queue: 'purchase_queue',
                        queueOptions: {
                          durable: true
                        },
                    }
                })                  
            },
            inject: [ConfigService],
        },
        
    ],
})
export class PurchaseModule {}