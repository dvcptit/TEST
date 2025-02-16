import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User,UserDocument,UserSchema} from './user.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/dto/createuserDto';
import { UpdateUserDto } from 'src/dto/updateuserDto';
import { Types } from 'mongoose';

import mongoose from 'mongoose';
import { RpcException } from '@nestjs/microservices';
import { Role } from 'src/role/role.enum';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) {}

    // Tìm người dùng theo username
  async findByUsername(username: string): Promise<User> {
    return await this.userModel.findOne({ username }).exec();
  }



async findById(id: string): Promise<User> {
  return await this.userModel.findOne({ _id: new Types.ObjectId(id) }).exec();
}


  // Thêm người dùng mới
  async addUser(createUserDto: CreateUserDto){
    const { username, password, role } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ username, password: hashedPassword, role: role || Role.User,});
    return await newUser.save();
  }
  // Lấy tất cả người dùng
  async getAllUsers(): Promise<User[]> {
    console.log("INSIDE SERVICE")
    return this.userModel.find().exec();  // Trả về tất cả người dùng
  }

  // Lấy người dùng theo id
  async getUserById(id: string): Promise<User | null> {
    // Kiểm tra nếu `id` không hợp lệ
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new RpcException(`Invalid User_ID format: ${id}`);
    }

    const user = await this.userModel.findById(id).exec();

    // Nếu không tìm thấy người dùng
    if (!user) {
        throw new RpcException(`User with ID ${id} not found`);
    }

    return user;
  } 
  // Cập nhật người dùng
  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const updatedData: any = {};
  
    if (updateUserDto.username) {
      updatedData.username = updateUserDto.username;
    }
  
    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      updatedData.password = hashedPassword;
    }
  
    return await this.userModel.findByIdAndUpdate(id, updatedData, { new: true });
  }

  // Xóa người dùng
  async deleteUser(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }
}