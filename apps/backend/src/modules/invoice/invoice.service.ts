import { PrismaService } from '@/database/prisma/prisma.service';
import { CreateInvoiceDto, UpdateInvoiceDto } from '@/dtos/invoice/invoice.dto';
import { Invoice as TInvoice } from '@invoice/types/src/invoice';
import { Injectable } from '@nestjs/common';
@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {}

  async create(createInvoiceDto: CreateInvoiceDto) {
    const { items, ...others } = createInvoiceDto;

    try {
      const invoiceCreated = await this.prisma.invoice.create({
        data: {
          ...others,
          items: { createMany: { data: items } },
        },
      });
      return invoiceCreated;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    const invoice = await this.prisma.invoice.findMany({
      where: { isDeleted: false },
      include: {
        buyer: { select: { name: true } },
        items: { where: { isDeleted: false } },
      },
    });

    const invoicesWithTotal = invoice.map((inv) => {
      const total = inv.items.reduce((acc, item) => {
        return acc + item.unitPrice * item.quantity;
      }, 0);
      return { ...inv, total };
    });
    return invoicesWithTotal;
  }

  async findOne(id: string) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
      include: {
        items: {
          where: { isDeleted: false },
        },
        createdBy: true,
        updatedBy: true,
      },
    });
    const itemsWithSubtotal = invoice.items.map((item) => {
      return { ...item, subtotal: item.unitPrice * item.quantity };
    });
    const invoiceWithTotal: TInvoice = { ...invoice, items: itemsWithSubtotal };
    invoiceWithTotal.total = itemsWithSubtotal.reduce((acc, item) => {
      return acc + item.subtotal;
    }, 0);

    return invoiceWithTotal;
  }

  update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    return this.prisma.invoice.update({
      where: { id },
      data: {
        ...updateInvoiceDto,
        updatedAt: new Date(),
      },
    });
  }

  remove(id: string) {
    return this.prisma.invoice.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });
  }
}
