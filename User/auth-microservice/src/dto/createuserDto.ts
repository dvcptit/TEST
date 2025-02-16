import { IsString, MinLength, MaxLength, IsNotEmpty, IsEnum, IsOptional} from 'class-validator';
import { Role } from 'src/role/role.enum';
export class CreateUserDto {
  @IsString({message: 'Tên bắt buộc phải là ký tự'})
  @MinLength(4,{message: 'Chiều dài tối thiểu là 4'})
  username: string;

  @IsNotEmpty({message: 'Mật khẩu không rỗng'})
  @MinLength(6,{message: 'Chiều dài tối thiểu là 6'})
  password: string;

  @IsOptional() // role là tùy chọn
  @IsEnum(Role, { message: 'Role phải là user hoặc admin' })
  role?: Role;
}
