import { Controller } from "@nestjs/common";
import { ProductService } from "./product.service";

import { Get,Param,Post, Body, Patch, Delete } from "@nestjs/common";
import { CreateProductDto } from "src/dto/createproductDto";
import { UpdateProductDto } from "src/dto/updateproductDto";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller('product')
export class ProductController{
    constructor(private readonly productService: ProductService){}

        // @Get()
  // @CacheKey('users')
//   @CacheTTL(0)
    @MessagePattern({cmd: 'get-all-product'})
    async getAllProducts() {
      console.log("INSIDE CONTROLLER")
      return this.productService.getAllProducts();
    }

  // @Get(':id')
  @MessagePattern({cmd:'get-product-by-id'})
  async getProductById(@Payload() id: string) {
    return this.productService.getProductById(id);
  }

  // @Post
  @MessagePattern({cmd: 'add-product'})
  async addProduct(@Payload() createProductDto: CreateProductDto) {
    return this.productService.addProduct(createProductDto);
  }

//   @UseGuards(AuthGuard)
  // @Patch(':id')
  @MessagePattern({cmd: 'update-product'})
  async updateProduct(
    @Payload() payload: any  
  ) {
  // Kiểm tra và gọi service để cập nhật người dùng
    const {id, updateproductDto} = payload 
    return this.productService.updateProduct(id, updateproductDto);
  }
//   @UseGuards(AuthGuard)
  // @Delete(':id')
  @MessagePattern({cmd: 'delete-product'})
  async deleteProduct(@Payload() id: string) {
    return this.productService.deleteProduct(id);
  }

}