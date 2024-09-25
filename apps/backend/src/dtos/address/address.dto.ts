import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { StateValidator } from '../state/state.dto';

export class AddressDto {
  @ApiProperty({
    example: '12, Jalan Nanas,',
    description: 'Address Line 1',
  })
  @IsString()
  @IsDefined()
  line1!: string;

  @ApiProperty({
    example: 'Taman Nenas',
    description: 'Address Line 2',
  })
  @IsOptional()
  @IsString()
  line2?: string;
  @IsOptional()
  @IsString()
  line3?: string;
  @IsOptional()
  @IsString()
  postalZone?: string;
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({
    example: '01',
    description: 'State Code, refer to state constants for more info',
  })
  @IsString()
  @IsDefined()
  state!: string;

  @ApiProperty({
    example: 'MYS',
    description: 'Country Code',
  })
  @IsString()
  @IsDefined()
  country!: string;
}

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  line1!: string;

  @IsOptional()
  @IsString()
  line2?: string;

  @IsOptional()
  @IsString()
  line3?: string;

  @IsOptional()
  @IsString()
  postalZone?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsString()
  @IsNotEmpty()
  @Validate(StateValidator)
  state!: string;

  @IsString()
  @IsNotEmpty()
  country!: string;
}
