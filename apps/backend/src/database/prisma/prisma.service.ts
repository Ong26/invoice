import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      // log: [{ emit: 'event', level: 'query' }],
      omit: { user: { password: true } },
    });
  }
  async onModuleInit() {
    await this.$connect();
  }
}
