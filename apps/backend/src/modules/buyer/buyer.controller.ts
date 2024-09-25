import { CreateBuyerDto, UpdateBuyerDto } from '@/dtos/party/buyer/buyer.dto';

import { User } from '@/decorator/user.decorator';
import { JwtUser } from '@invoice/types/src/user';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth-guard';
import { BuyerService } from './buyer.service';
@ApiTags('Buyer')
@Controller('buyer')
export class BuyerController {
  constructor(private readonly buyerService: BuyerService) {}
  @ApiCookieAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: CreateBuyerDto, @User() user: JwtUser) {
    return await this.buyerService.create({ ...data, createdById: user.id });
  }
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.buyerService.findAll();
  }

  // @ApiOkResponse({ type: BuyerDto })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const buyer = await this.buyerService.findOne(id);
    return buyer;
  }

  // @ApiBearerAuth()
  @ApiCookieAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBuyerDto: UpdateBuyerDto,
    @User() user: JwtUser,
  ) {
    return this.buyerService.update(id, {
      ...updateBuyerDto,
      updatedById: user.id,
    });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.buyerService.remove(id);
  }
}
