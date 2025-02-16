import { Controller } from "@nestjs/common";
import { Get,Param,Post, Body, Patch, Delete } from "@nestjs/common";

import { MessagePattern, Payload } from "@nestjs/microservices";
import { PurchaseService } from "./purchase.service";
import { CreatePurchaseDto } from "./createPurchaseDto";
@Controller('purchase')
export class PurchaseController{
    constructor(private readonly purchaseService: PurchaseService){}

 
  @MessagePattern({cmd: 'create-purchase-order'})
  async addPurchase(@Payload() createPurchaseDto: CreatePurchaseDto) {
    return this.purchaseService.addPurchase(createPurchaseDto);
  }

  @MessagePattern({ cmd: 'update-purchase-status' })
  async updatePurchaseStatus(@Payload() data: { id: string; status: string }) {
    const { id, status } = data;

    // Cập nhật trạng thái trong cơ sở dữ liệu
    const updatedPurchase = await this.purchaseService.updateStatus(id, status);

    return updatedPurchase;
  }


}