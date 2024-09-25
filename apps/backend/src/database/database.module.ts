import { BuyerService } from '@/modules/buyer/buyer.service';
import { SupplierService } from '@/modules/supplier/supplier.service';
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService, BuyerService, SupplierService],
  get exports() {
    return this.providers;
  },
})
export class DatabaseModule {}
