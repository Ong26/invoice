import { ValidateTINBy } from '@invoice/constants/dist/validate-tin-method';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { AddressDto } from '../address/address.dto';
import { ContactNumberDto } from '../contact-number/contact-number.dto';

export class PartyDto {
  @ApiProperty({
    example: 'clxuqxy0v000008md7cegathx',
    description: 'Buyer ID',
  })
  @IsString({ message: 'Buyer ID must be a string' })
  id: string;

  @ApiProperty({ example: 'John Doe', description: 'Name of the buyer' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({
    example: '12345678901234',
    description: 'Tax Identification Number',
  })
  @IsNotEmpty({ message: 'TIN is required' })
  TIN: string;

  @ApiProperty({
    example: '12345678901234567890',
    description: 'Business Registration Number',
  })
  @IsOptional()
  BRN?: string;

  @ApiProperty({ example: '900101025101', description: 'MyKad Number' })
  @ValidateIf((o) => o.myKadNo.length > 0)
  @Length(12, 12, { message: 'MyKad number must be 12 characters' })
  @Matches(/^\d{6}\d{2}\d{4}$/, { message: 'Invalid MyKad number' })
  myKadNo?: string;

  @ApiProperty({ example: '95022005200', description: 'Army Number' })
  @IsOptional()
  armyNo?: string;

  @ApiProperty({ example: 'A1234567890', description: 'Passport Number' })
  @IsOptional()
  @IsString({ message: 'Invalid Value' })
  passportNo?: string;

  @ApiProperty({
    example: '12345678901234567',
    description: 'SST Registration Number',
    maxLength: 17,
  })
  @IsOptional()
  @IsString()
  SST?: string;

  @ApiProperty({
    example: 'buyer1@gmail.com',
    description: 'Email address of the buyer',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @ApiProperty({
    example: {
      countryCode: '+60',
      number: '1234567890',
    },
    description: 'Contact number of the buyer',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ContactNumberDto)
  contactNumber: ContactNumberDto;

  @ApiProperty({
    example: 'BRN',
    description: 'Validate TIN by BRN, MYKAD, ARMYNO or PASSPORT',
    enum: ['BRN', 'MYKAD', 'ARMYNO', 'PASSPORT'],
  })
  @IsEnum(ValidateTINBy, { message: 'Invalid TIN validation method' })
  @IsOptional()
  validateTINBy: string;

  @ApiProperty({
    example: {
      line1: '12, Jalan Nanas,',
      line2: 'Taman Nenas',
      postalZone: '12345',
      city: 'Kuala Lumpur',
      state: '14',
      country: 'MYS',
    },
    description: 'Address of the buyer',
  })
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  // @IsDate()
  // UpdatedAt: Date;

  // @IsDate()
  // CreatedAt: Date;

  // @IsOptional()
  // CreatedBy: string;
}
