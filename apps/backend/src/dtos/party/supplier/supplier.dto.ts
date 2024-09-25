import { MSICValidator } from '@/dtos/msic/msic.dto';
import { PartyDto } from '@/dtos/party/party.dto';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  Validate,
} from 'class-validator';

export class SupplierDto extends PartyDto {
  @IsString()
  @IsOptional()
  @Length(17)
  tourismTaxNo?: string;

  @IsString()
  @IsNotEmpty()
  @Length(5)
  @Validate(MSICValidator)
  MSICCode!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  businessActivityDescription!: string;
}

export class CreateSupplierDto extends SupplierDto {}

export class UpdateSupplierDto {}
