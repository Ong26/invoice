import { PrismaService } from '@/database/prisma/prisma.service';
import { CreateBuyerDto, UpdateBuyerDto } from '@/dtos/party/buyer/buyer.dto';
import { Injectable } from '@nestjs/common';
import { Buyer } from '@prisma/client';
@Injectable()
export class BuyerService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateBuyerDto): Promise<Buyer> {
    const { contactNumber, address, ...others } = data;

    return await this.prisma.buyer.create({
      data: {
        ...others,
        address: { create: address },
        contactNumber: { create: contactNumber },
      },
    });
  }

  findAll() {
    return this.prisma.buyer.findMany({
      include: {
        address: { omit: { buyerId: true } },
        contactNumber: { omit: { buyerId: true } },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.buyer.findUnique({
      where: { id },
      include: {
        address: { omit: { buyerId: true } },
        contactNumber: { omit: { buyerId: true } },
        createdBy: { omit: { password: true } },
        updatedBy: { omit: { password: true } },
      },
    });
  }

  update(id: string, data: UpdateBuyerDto) {
    const { contactNumber, address, ...others } = data;

    return this.prisma.buyer.update({
      where: { id },
      data: {
        ...others,
        address: { update: address },
        contactNumber: { update: contactNumber },
        updatedAt: new Date(),
      },
    });
  }

  async remove(id: string) {
    await this.prisma.buyer.delete({ where: { id } });
  }
}
