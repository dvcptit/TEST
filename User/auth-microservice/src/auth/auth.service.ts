
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CACHE_MANAGER,Cache } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { console } from 'inspector';




@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    
    @Inject(CACHE_MANAGER) private cacheManager: Cache,

  ) {
  }
    async signIn(username: string, password: string) {
     
    const cachedData = await this.cacheManager.get(username);
    if (cachedData) {
      console.log("Got data from cache");
      return cachedData;
    }

    const user = await this.usersService.findByUsername(username);
    console.log(user);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log(user.password);
      throw new UnauthorizedException();
    }

    // Thêm role vào payload
    const payload = { 
      sub: user.id, 
      username: user.username, 
      role: user.role  // Thêm role của người dùng vào payload
    };

    const token = await this.jwtService.signAsync(payload);
    
    // Lưu token vào cache (nếu cần thiết)
    await this.cacheManager.set(username, token);
    return {
      
      access_token: token,
    };

  }
}






