import { PrismaService } from '@/database/prisma/prisma.service';
import {
  CreateInvoiceItemDto,
  CreateInvoiceItemDtoOnEdit,
} from '@/dtos/invoice-line-item/invoice-item.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InvoiceItemService {
  constructor(private prisma: PrismaService) {}

  createMany(data: CreateInvoiceItemDto[], invoiceId: string) {
    const dataWithInvoiceId = data.map((item) => ({ ...item, invoiceId }));
    return this.prisma.invoiceLineItem.createMany({ data: dataWithInvoiceId });
  }

  create(data: CreateInvoiceItemDtoOnEdit) {
    return this.prisma.invoiceLineItem.create({
      data,
    });
  }

  update(id: string, data: CreateInvoiceItemDtoOnEdit) {
    return this.prisma.invoiceLineItem.update({
      where: { id },
      data,
    });
  }
  delete(id: string) {
    return this.prisma.invoiceLineItem.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
