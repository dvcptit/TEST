import { ConfigModule, ConfigService } from "@nestjs/config";
import { ProductController } from "./product.controller";
import { ClientProxy, ClientProxyFactory } from "@nestjs/microservices";
import { Transport } from "@nestjs/microservices";

import { Module } from "@nestjs/common";


@Module({
    imports: [ConfigModule],
    controllers: [ProductController],
    providers:[
        {
            provide: 'PRODUCT_SERVICE',
            useFactory: (configService: ConfigService) => {
                return ClientProxyFactory.create({
                    transport: Transport.RMQ,
                    options: {
                        urls: ['amqp://localhost:5672'],
                        queue: 'product_queue',
                        queueOptions: {
                          durable: true
                        },
                    }
                })                  
            },
            inject: [ConfigService],
        },
        
    ],
    exports: ['PRODUCT_SERVICE'],
})
export class ProductModule {}