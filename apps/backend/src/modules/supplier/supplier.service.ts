import {
  CreateSupplierDto,
  UpdateSupplierDto,
} from '@/dtos/party/supplier/supplier.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SupplierService {
  create(createSupplierDto: CreateSupplierDto) {
    return 'This action adds a new supplier';
  }

  findAll() {
    return `This action returns all supplier`;
  }

  findOne(id: string) {
    return `This action returns a #${id} supplier`;
  }

  update(id: string, updateSupplierDto: UpdateSupplierDto) {
    return `This action updates a #${id} supplier`;
  }

  remove(id: string) {
    return `This action removes a #${id} supplier`;
  }
}
