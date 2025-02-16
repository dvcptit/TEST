import { IsString } from 'class-validator';

export class UpdatePurchaseDto {
  @IsString()
  status: string;
}
