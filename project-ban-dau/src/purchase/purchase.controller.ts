import { Controller, Get , Post , Body , Param, Patch, Delete} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Inject } from "@nestjs/common";
import { CreatePurchaseDto } from "./createPurchaseDto";
import { NotFoundException } from "@nestjs/common";
import { UpdatePurchaseDto } from "./updatePurchaseDto";
@Controller('purchase')
export class PurchaseController{
    constructor(
        @Inject('USER_SERVICE')
    private readonly userService: ClientProxy,

        @Inject('PRODUCT_SERVICE')
        private readonly productService: ClientProxy,

        @Inject('PURCHASE_SERVICE')
        private readonly purchaseService: ClientProxy,

    ){}

    @Post()
    async createPurchase(@Body() createPurchaseDto: CreatePurchaseDto) {

    const { userId, productId, quantity } = createPurchaseDto;

    const userInfo = await this.userService.send({ cmd: 'get-user-by-id' }, userId).toPromise();
    if (!userInfo) {
        throw new NotFoundException(`User with ID ${userId} not found`);
    }
    
    const productInfo = await this.productService.send({ cmd: 'get-product-by-id' }, productId).toPromise();
    if (!productInfo) {
        throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    const total = productInfo.price * quantity;
    const purchaseOrder = {
        userId,
        productId,
        quantity,
        total,
        status: 'pending',
    };
    console.log('Purchase Order Created:', purchaseOrder);
    return this.purchaseService.send({ cmd: 'create-purchase-order' }, purchaseOrder);
}

    @Patch(':id')
    async updatePurchaseStatus(
        @Param('id') id: String,
        @Body()
        updatePurchaseDto: UpdatePurchaseDto,
      ) {
        const { status } = updatePurchaseDto;
    
        const updatedPurchase = await this.purchaseService
          .send({ cmd: 'update-purchase-status' }, { id, status })
          .toPromise();
    
        if (!updatedPurchase) {
          throw new Error('Purchase not found');
        }
    
        return updatedPurchase;
      }

}
