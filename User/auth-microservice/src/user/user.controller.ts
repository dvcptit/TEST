import { Controller,Patch, Post, Body, Put, Delete, Param, Get, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/createuserDto';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { UpdateUserDto } from 'src/dto/updateuserDto';
import { MessagePattern, Payload } from "@nestjs/microservices";
import { Roles } from 'src/role/roles.decorator';
import { Role } from 'src/role/role.enum';
import { ForbiddenException } from '@nestjs/common';
@Controller('users')
@UseInterceptors(CacheInterceptor)
export class UserController {
  constructor(private readonly userService: UserService,
    ) {}

  // Lấy danh sách tất cả người dùng
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)

  @MessagePattern({cmd: 'get-all-user'})
  async getAllUsers(@Payload() payload: any) {
    console.log(payload)
    return this.userService.getAllUsers();
  }

  // Lấy thông tin người dùng theo id
  // @Get(':id')
  @MessagePattern({cmd: 'get-user-by-id'})
  async getUserById(@Payload() id: string) {
    return this.userService.getUserById(id);
  }

  @MessagePattern({cmd:'add-user'})
  async addUser(@Payload() createUserDto: CreateUserDto) {
    return this.userService.addUser(createUserDto);
  }
  @UseGuards(AuthGuard)
  @MessagePattern({cmd:'update-user'})
  async updateUser(
    @Payload() payload: any
  ) {

   const {id,updateUserDto} = payload
   const user = payload?.user; 
   try {
    // Kiểm tra quyền
    if (user?.sub !== id && user?.role !== Role.Admin) {
      // Nếu không phải chính mình và không phải admin, trả về thông báo lỗi tùy chỉnh thay vì ném lỗi ForbiddenException
      return { status: 'error', message: 'Bạn không có quyền sửa thông tin của người khác' };
    }

    return this.userService.updateUser(id, updateUserDto);
  } catch (error) {
    // Xử lý nếu có lỗi trong khi gọi service
    return { status: 'error', message: 'Có lỗi xảy ra khi cập nhật người dùng', error: error.message };
  }
  }
  @UseGuards(AuthGuard)
  @MessagePattern({cmd:'delete-user'})
  async deleteUser(@Payload() payload: any) {
    const {id} = payload
    const user = payload?.user; // Lấy user từ payload
    try {
      // Kiểm tra quyền
      if (user?.sub !== id && user?.role !== Role.Admin) {
        // Nếu không phải chính mình và không phải admin, trả về thông báo lỗi tùy chỉnh thay vì ném lỗi ForbiddenException
        return { status: 'error', message: 'Bạn không có quyền xóa của người khác' };
      }
  
      return this.userService.deleteUser(id);
    } catch (error) {
      // Xử lý nếu có lỗi trong khi gọi service
      return { status: 'error', message: 'Có lỗi xảy ra khi xóa người dùng', error: error.message };
    }
  }

}
