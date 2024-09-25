import { CreateBuyerDto } from '@/dtos/party/buyer/buyer.dto';
import { CreateSupplierDto } from '@/dtos/party/supplier/supplier.dto';
import {
  IsDateString,
  IsNotEmpty,
  IsString,
  MaxLength,
  Validate,
} from 'class-validator';
import { TimeValidator } from '../../helpers/validator/time-validator';
import { CreateInvoiceItemDto } from '../invoice-line-item/create.invoice-item.dto';
import { InvoiceTypeValidator } from './invoice-type.dto';

export class CreateLHDNInvoiceDto {
  Supplier!: CreateSupplierDto;
  Buyer!: CreateBuyerDto;

  @Validate(CreateInvoiceItemDto, { each: true })
  InvoiceItems!: CreateInvoiceItemDto[];

  @IsString()
  @MaxLength(5)
  Version!: string;

  @IsString()
  @Validate(InvoiceTypeValidator)
  InvoiceTypeCode!: string;

  @IsString()
  @MaxLength(50)
  ID!: string;

  @IsDateString({ strict: true }, { message: 'Invalid date format' })
  @IsNotEmpty()
  Date!: string;

  @IsNotEmpty()
  @Validate(TimeValidator)
  Time!: string;
}
