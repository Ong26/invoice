import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'johndoe@gmail.com',
  })
  @IsString()
  @IsDefined()
  email: string;

  @ApiProperty({
    example: 'password',
  })
  @IsString()
  @IsDefined()
  password: string;
}
