import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Purchase, PurchaseDocument} from "./purchase.schema";
import { CreatePurchaseDto } from "./createPurchaseDto";
export class PurchaseService{
    constructor(@InjectModel('Purchase') private readonly PurchaseModel: Model<PurchaseDocument>){}

  async addPurchase(createPurchaseDto: CreatePurchaseDto){
    const { userId,productId,quantity, total, status } = createPurchaseDto;
    const newPurchase = new this.PurchaseModel({  userId,productId,quantity, total, status });
    return await newPurchase.save();
  }

  async updateStatus(id: string, status: string): Promise<Purchase> {
    const updatedPurchase = await this.PurchaseModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!updatedPurchase) {
      throw new Error('Purchase not found');
    }

    return updatedPurchase;
  }

}