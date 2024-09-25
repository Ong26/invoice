import { Module } from '@nestjs/common';
import { EventGateway } from './event.gateway';

@Module({
  controllers: [],
  providers: [EventGateway],
})
export class GatewayModule {}
