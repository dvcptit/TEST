import { IsOptional, IsString, MinLength, MaxLength,IsNotEmpty } from 'class-validator';
import { IsUpdatable } from './IsUpdatable';
export class UpdateUserDto {
  @IsOptional()
  @IsString({message: 'Tên bắt buộc phải là ký tự'})
  @MinLength(4,{message: 'Chiều dài tối thiểu là 4'})
  @IsUpdatable.apply({ message: 'Tên chỉ có thể cập nhật nếu status là online!'})
  username?: string;

  @IsOptional()
  @IsNotEmpty({message: 'Mật khẩu không rỗng'})
  @MinLength(6,{message: 'Chiều dài tối thiểu là 6'})
  @IsUpdatable.apply({ message: 'Mật khẩu chỉ có thể cập nhật nếu status là online!'})
  password?: string;

  @IsString({message: 'Status bắt buộcc phải là ký tự'})
  status: string;
}
