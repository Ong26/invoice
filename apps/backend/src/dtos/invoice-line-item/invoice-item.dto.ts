import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Validate,
} from 'class-validator';
import { ClassificationValidator } from './classification.dto';

export class CreateInvoiceItemDto {
  @IsString()
  @Validate(ClassificationValidator)
  @IsOptional()
  classification: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  description: string;

  @IsNotEmpty()
  unitPrice: number;

  @IsOptional()
  quantity: number;

  @IsOptional()
  discountRate: number;
}
export class CreateInvoiceItemDtoOnEdit extends CreateInvoiceItemDto {
  @IsDefined()
  @IsNotEmpty()
  invoiceId: string;
}

export class UpdateInvoiceItemDtoOnEdit extends CreateInvoiceItemDto {
  @IsDefined()
  @IsNotEmpty()
  id: string;
}
