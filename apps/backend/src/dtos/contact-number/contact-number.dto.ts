import { CountryCodeList } from '@invoice/constants/dist/country-code';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumberString } from 'class-validator';

export class ContactNumberDto {
  @ApiProperty({
    example: '+60',
    description: 'Country Code',
  })
  @IsIn(CountryCodeList, { message: 'Invalid Country Code' })
  countryCode: string;

  @ApiProperty({
    example: '1234567890',
    description: 'Phone Number without Country Code',
  })
  @IsNumberString()
  number: string;
}
