
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    // Lấy dữ liệu từ RPC payload
    const rpcPayload = context.switchToRpc().getData();
    const user = rpcPayload?.user; // Giả sử thông tin người dùng đã được đính kèm trong payload
    console.log('User in RolesGuard:', user);
    if (!user || !user.role) {
      return false; // Không có vai trò người dùng trong payload
      
    }
    return requiredRoles.some((role) => user.role === role);
  }
}
