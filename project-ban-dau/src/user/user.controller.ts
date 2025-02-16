import { Controller, Get , Post , Body , Param, Patch, Delete, Headers,BadRequestException} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Inject } from "@nestjs/common";
import { CreateUserDto } from "./createuserDto";
import { UpdateUserDto } from "./updateuserDto";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags('user')  // ✅ Hiển thị nhóm API trong Swagger
@ApiBearerAuth()

@Controller('user')
export class UserController{
    constructor(
        @Inject('USER_SERVICE')
        private readonly userService: ClientProxy,
    ){}

    @Get()
    async getAllUsers(
        @Headers('authorization') authorization: string, // Lấy token từ headers
    ){

        if (!authorization) {
            throw new BadRequestException('Authorization header is missing');
          }
        return this.userService.send(
             {cmd: 'get-all-user'},
             {authorization },
        );
    }
    @Post('login')
    async login(@Body() createuserDTO: CreateUserDto){
        return this.userService.send(
            {cmd:'login'},
            createuserDTO
        )
    }
    @Get(':id')
    async getUserById(@Param('id') id: string){
        console.log(id);
        return this.userService.send(
            {cmd:'get-user-by-id'},
            id
        )
    }
    @Post()
    async adduser(@Body() createUserDto: CreateUserDto){
        return this.userService.send(
            {cmd: 'add-user'},
            createUserDto
        )
    }

    @Patch(':id')
async updateUser(
  @Param('id') id: string,
  @Body() updateUserDto: UpdateUserDto,
  @Headers('authorization') authorization: string, // Lấy token từ headers
) {
  // Kiểm tra nếu authorization rỗng
  if (!authorization) {
    throw new BadRequestException('Authorization header is missing');
  }

  console.log({ id, updateUserDto });

  // Gửi dữ liệu qua RabbitMQ
  return this.userService.send(
    { cmd: 'update-user' },
    { id, updateUserDto, authorization },
  );
}

    @Delete(':id')
    async deleteuser(
        @Param('id') id: string,
        @Headers('authorization') authorization: string,
    ){
        // Kiểm tra nếu authorization rỗng
        if (!authorization) {
            throw new BadRequestException('Authorization header is missing');
        }

        return this.userService.send(
            {cmd:'delete-user'},
            {id,authorization}
        );
    }
}
