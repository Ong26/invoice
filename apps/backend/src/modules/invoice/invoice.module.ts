import { Module } from '@nestjs/common';
import { InvoiceItemService } from '../invoice-item/invoice-item.service';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';

@Module({
  controllers: [InvoiceController],
  providers: [InvoiceService, InvoiceItemService],
})
export class InvoiceModule {}
