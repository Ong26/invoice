import { PrismaService } from '@/database/prisma/prisma.service';
import {
  CreateUserDto,
  UpdateUserDto,
  UpdateUserPasswordDto,
} from '@/dtos/user/user.dto';
import { Injectable } from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';
export type User = any;

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  static hashPassword(password: string): string {
    return hashSync(password, +process.env.HASH_SALT);
  }
  static comparePassword(password: string, hash: string): boolean {
    return compareSync(password, hash);
  }

  async findOneWithPassword(email: string): Promise<User | undefined> {
    return await this.prisma.user.findFirst({
      where: { email, isDeleted: false },
      select: { email: true, role: true, password: true },
    });
  }
  async findOne(email: string): Promise<User | undefined> {
    return await this.prisma.user.findUnique({
      where: { email, isDeleted: false },
    });
  }

  async checkIsValidForCreate(
    email: string,
    username: string,
    options?: { id: string },
  ) {
    const isValid = await this.prisma.user.findMany({
      where: {
        OR: [{ email }, { username }],
        AND: [{ isDeleted: false }],
        NOT: [{ id: options?.id }],
      },
    });
    return isValid.length > 0;
  }

  async create(data: CreateUserDto) {
    const { password, ...others } = data;
    const hashedPassword = UserService.hashPassword(password);
    return await this.prisma.user.create({
      data: { ...others, password: hashedPassword },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async update(id: string, data: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async updatePassword(id: string, data: UpdateUserPasswordDto) {
    const hashedPassword = UserService.hashPassword(data.password);
    return await this.prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }

  async remove(id: string) {
    try {
      await this.prisma.user.delete({ where: { id } });
      return true;
    } catch (error) {
      return false;
    }
  }
}
