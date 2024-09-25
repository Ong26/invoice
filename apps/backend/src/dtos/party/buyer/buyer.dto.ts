import { OmitType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { PartyDto } from '../party.dto';

export class BuyerDto extends PartyDto {}

export class CreateBuyerDto extends OmitType(BuyerDto, ['id']) {
  @IsOptional()
  createdById: string;
}
export class UpdateBuyerDto extends OmitType(BuyerDto, ['id']) {
  @IsOptional()
  updatedById: string;
}
