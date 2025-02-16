
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
    UseInterceptors
  } from '@nestjs/common';
  import { AuthGuard } from './auth.guard';
  import { AuthService } from './auth.service';
  import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { MessagePattern } from '@nestjs/microservices';
  // @UseInterceptors(CacheInterceptor)
  @Controller('user')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @HttpCode(HttpStatus.OK)
    @MessagePattern({cmd:'login'})
    signIn(@Body() signInDto: Record<string, any>) {
      console.log("🔥 Đã nhận được request từ microservice với dữ liệu:", signInDto);
      return this.authService.signIn(signInDto.username, signInDto.password);
    }
    // @CacheKey('profile')
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
  }
  