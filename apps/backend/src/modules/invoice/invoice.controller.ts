import { User } from '@/decorator/user.decorator';
import { CreateInvoiceDto, UpdateInvoiceDto } from '@/dtos/invoice/invoice.dto';
import { JwtUser } from '@invoice/types/src/user';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth-guard';
import { InvoiceService } from './invoice.service';
@ApiTags('Invoice')
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @ApiCookieAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createInvoiceDto: CreateInvoiceDto,
    @User() user: JwtUser,
  ) {
    const res = await this.invoiceService.create({
      ...createInvoiceDto,
      createdById: user.id,
    });
    return { id: res.id };
  }

  @Get()
  findAll() {
    return this.invoiceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.invoiceService.findOne(id);
    } catch (error) {
      throw new NotFoundException('Invoice not found');
    }
  }

  @ApiCookieAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
    @User() user: JwtUser,
  ) {
    return this.invoiceService.update(id, {
      ...updateInvoiceDto,
      updatedById: user.id,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceService.remove(id);
  }
}
