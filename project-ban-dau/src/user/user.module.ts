import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserController } from "./user.controller";
import { ClientProxy, ClientProxyFactory } from "@nestjs/microservices";
import { Transport } from "@nestjs/microservices";
import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";


@Module({
    imports: [ConfigModule,
    ],
    controllers: [ UserController],
    providers:[
        {
            provide: 'USER_SERVICE',
            useFactory: (configService: ConfigService) => {
                return ClientProxyFactory.create({
                    transport: Transport.RMQ,
                    options: {
                        urls: ['amqp://localhost:5672'],
                        queue: 'user_queue',
                        queueOptions: {
                          durable: true
                        },
                    }
                })                  
            },
            inject: [ConfigService],
        },
        
    ],
    exports: ['USER_SERVICE'],
})
export class UserModule {}