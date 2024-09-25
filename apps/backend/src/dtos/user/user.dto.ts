import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsDefined,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserDto {
  @ApiProperty({ example: '', description: 'User ID' })
  @IsOptional()
  @IsString()
  id: string;

  @ApiProperty({ example: 'JohnDoe' })
  @IsAlphanumeric()
  username: string;

  @ApiPropertyOptional({
    example: 'John',
    description: 'Name of the user',
  })
  @IsString()
  firstName: string;

  @ApiPropertyOptional({
    example: 'Doe',
    description: 'Name of the user',
  })
  @IsString()
  lastName: string;

  @ApiPropertyOptional({ example: 'johndoe@gmail.com' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: 'password' })
  // @IsStrongPassword()
  password: string;

  @ApiPropertyOptional({
    example: 'ADMIN',
  })
  @IsEnum(['SUPER_ADMIN', 'ADMIN', 'USER'])
  role: string;
}

export class CreateUserDto extends OmitType(UserDto, ['id']) {
  @IsDefined()
  @IsString()
  password: string;
}

export class UpdateUserDto extends OmitType(UserDto, ['password', 'id']) {}

export class UpdateUserPasswordDto {
  @ApiProperty({ example: '', description: 'User ID' })
  @IsString()
  @IsDefined()
  id: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @IsDefined()
  password: string;
}
