import { CreateInvoiceItemDto } from '@/dtos/invoice-line-item/invoice-item.dto';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import { TimeValidator } from '../../helpers/validator/time-validator';

export class InvoiceDto {
  @IsOptional()
  buyerId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  paymentTerms: string;

  @IsDateString({ strict: true }, { message: 'Invalid date format' })
  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  @Validate(TimeValidator)
  time: string;
}

export class CreateInvoiceDto extends InvoiceDto {
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceItemDto)
  @IsDefined()
  items: CreateInvoiceItemDto[];

  @IsOptional()
  createdById: string;
}

export class UpdateInvoiceDto extends InvoiceDto {
  @IsOptional()
  updatedById: string;
}

export class GetInvoiceItemDto extends InvoiceDto {
  @IsOptional()
  createdById: string;

  @IsOptional()
  updatedById: string;
}
