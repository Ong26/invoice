import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { BuyerModule } from './modules/buyer/buyer.module';
import { GatewayModule } from './modules/gateway/gateway.module';
import { InvoiceItemModule } from './modules/invoice-item/invoice-item.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { SupplierModule } from './modules/supplier/supplier.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    BuyerModule,
    SupplierModule,
    AuthModule,
    UserModule,
    InvoiceModule,
    GatewayModule,
    InvoiceItemModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10000,
      },
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
