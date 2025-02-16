import { InjectModel } from "@nestjs/mongoose";
import { Product,ProductDocument } from "./product.schema";
import { Model } from "mongoose";
import { CreateProductDto } from "src/dto/createproductDto";
import { UpdateProductDto } from "src/dto/updateproductDto";

import { isValidObjectId } from 'mongoose';
import { RpcException } from '@nestjs/microservices';

export class ProductService{
    constructor(@InjectModel('Product') private readonly productModel: Model<ProductDocument>){}

      // Tìm người dùng theo Productname
  async findByProductname(Productname: string): Promise<Product> {
    return await this.productModel.findOne({ Productname }).exec();
  }

  // Thêm người dùng mới
  async addProduct(createProductDto: CreateProductDto){
    const { name, price,describe } = createProductDto;
    const newProduct = new this.productModel({ name, price,describe });
    return await newProduct.save();
  }
  // Lấy tất cả người dùng
  async getAllProducts(): Promise<Product[]> {
    console.log("INSIDE SERVICE")
    return this.productModel.find().exec();  // Trả về tất cả người dùng
  }

  // Lấy người dùng theo id
  async getProductById(id: string): Promise<Product | null> {
    // Kiểm tra xem ID có hợp lệ không
    if (!isValidObjectId(id)) {
      throw new RpcException({
        status: '400',
        message: `Invalid PRODUCT_ID format: ${id}`,
      });
    }

    // Thực hiện truy vấn nếu ID hợp lệ
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new RpcException({
        status: '400',
        message: `Product with ID ${id} not found`,
      });
    }

    return product;
  }

  // Cập nhật người dùng
  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    const updatedData: any = {};
  
    if (updateProductDto.name) {
      updatedData.name = updateProductDto.name;
    }
  
    if (updateProductDto.price) {
        updatedData.price = updateProductDto.price;
      }
      if (updateProductDto.describe) {
        updatedData.describe = updateProductDto.describe;
      }
    return await this.productModel.findByIdAndUpdate(id, updatedData, { new: true });
  }

  // Xóa người dùng
  async deleteProduct(id: string): Promise<Product> {
    return await this.productModel.findByIdAndDelete(id);
  }
}