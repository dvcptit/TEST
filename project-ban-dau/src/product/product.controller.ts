import { Controller, Get , Post , Body , Param, Patch, Delete} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Inject } from "@nestjs/common";
import { CreateProductDto } from "./createproductDto";
import { UpdateProductDto } from "./updateproductDto";


@Controller('product')
export class ProductController{
    constructor(
        @Inject('PRODUCT_SERVICE')
        private readonly productService: ClientProxy,
    ){}

    @Get()
    async getAllProducts(){
        return this.productService.send(
             {cmd: 'get-all-product'},
             {},
        );
    }
    @Get(':id')
    async getProductById(@Param('id') id: string){
        console.log(id);
        return this.productService.send(
            {cmd:'get-product-by-id'},
            id
        )
    }
    @Post()
    async addProduct(@Body() createproductDto: CreateProductDto){
        return this.productService.send(
            {cmd: 'add-product'},
            createproductDto
        )
    }

    @Patch(':id')
    async updateProduct(
        @Param('id') id: String,
        @Body() updateproductDto: UpdateProductDto
    ){
        
        console.log({id,updateproductDto})
        return this.productService.send(
            {cmd: 'update-product'},
            {id,updateproductDto}
        )
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string){
        return this.productService.send(
            {cmd:'delete-product'},
            id
        )
    }



}
