import {
  IsDecimal,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Validate,
} from 'class-validator';
import { ClassificationValidator } from './classification.dto';
import { TaxTypeValidator } from './tax-type.dto';

export class CreateInvoiceItemDto {
  @IsString()
  @Validate(ClassificationValidator)
  @IsNotEmpty()
  classification!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  description!: string;

  @IsDecimal()
  @IsNotEmpty()
  unitPrice: number;

  @IsString()
  @IsNotEmpty()
  @Validate(TaxTypeValidator)
  taxType?: string;

  @IsDecimal()
  @IsNotEmpty()
  taxRate?: number;

  @IsDecimal()
  @IsNotEmpty()
  taxAmount?: number;

  @IsOptional()
  @MaxLength(300)
  taxExemptionDetails?: string;

  @IsDecimal()
  @IsOptional()
  amountExemptedFromTax?: number;

  @IsDecimal()
  @IsNotEmpty()
  totalExcludingTax?: number;

  @IsDecimal()
  @IsOptional()
  quantity!: number;

  @IsOptional()
  discountRate?: number | boolean;
}
