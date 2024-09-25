import { Roles } from '@/decorator/role.decorator';
import {
  CreateUserDto,
  UpdateUserDto,
  UpdateUserPasswordDto,
} from '@/dtos/user/user.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth-guard';
import { RolesGuard } from '../auth/guard/role.guard';
import { UserService } from './user.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(['admin'])
  async create(@Body() data: CreateUserDto) {
    const { email, username } = data;
    const isDuplicated = await this.userService.checkIsValidForCreate(
      email,
      username,
    );
    if (isDuplicated)
      throw new HttpException(
        'Email or username has been used',
        HttpStatus.BAD_REQUEST,
      );
    return this.userService.create(data);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @Roles(['admin'])
  @UseGuards(RolesGuard)
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    const isDuplicated = await this.userService.checkIsValidForCreate(
      data.email,
      data.username,
      { id },
    );
    if (isDuplicated)
      throw new HttpException(
        'Email or username has been used',
        HttpStatus.BAD_REQUEST,
      );
    return this.userService.update(id, data);
  }

  @Patch(':id/password')
  async updatePassword(
    @Param('id') id: string,
    @Body() data: UpdateUserPasswordDto,
  ) {
    return this.userService.updatePassword('id', data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const isDeleted = await this.userService.remove(id);
    if (!isDeleted)
      throw new HttpException('Delete fail', HttpStatus.NOT_FOUND);
    return { id: id, isDeleted: isDeleted };
  }
}
