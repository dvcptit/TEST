import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store'
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './role/roles.guard';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27018/db'),
    CacheModule.register({
      max: 100,
      ttl: 604800,
      isGlobal: true,
      store: redisStore,
      host:'localhost',
      port: 6379
    }),
    
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // Kiểm tra quyền truy cập API
    },
  ],
})
export class AppModule {}
