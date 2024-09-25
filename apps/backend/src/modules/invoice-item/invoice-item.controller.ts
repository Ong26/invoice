import { CreateInvoiceItemDtoOnEdit } from '@/dtos/invoice-line-item/invoice-item.dto';
import {
  Body,
  Controller,
  Delete,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth-guard';
import { InvoiceItemService } from './invoice-item.service';

@Controller('invoice-item')
export class InvoiceItemController {
  constructor(private readonly invoiceItemService: InvoiceItemService) {}

  @ApiCookieAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: CreateInvoiceItemDtoOnEdit) {
    const res = await this.invoiceItemService.create(data);
    return { id: res.id };
  }

  @ApiCookieAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: CreateInvoiceItemDtoOnEdit,
  ) {
    const res = await this.invoiceItemService.update(id, data);
    return { id: res.id };
  }

  @ApiCookieAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.invoiceItemService.delete(id);
      return { id };
    } catch (error) {
      throw new NotFoundException('Invoice item not found');
    }
  }
}
