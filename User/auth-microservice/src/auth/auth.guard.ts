import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rpcPayload = context.switchToRpc().getData();
  
    // Kiểm tra token
    const token = rpcPayload?.authorization?.split(' ')[1];
    if (!token) {
      console.error('Authorization token is missing');
      throw new UnauthorizedException('Authorization token is missing');
    }
  
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      rpcPayload['user'] = payload;
    } catch (err) {
      console.error('Invalid token:', err.message);
      throw new UnauthorizedException('Invalid token');
    }
  
    return true;
  }
  
}
