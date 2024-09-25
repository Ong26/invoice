import { BuyerService } from '@/modules/buyer/buyer.service';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [BuyerService],
  get exports() {
    return [...this.imports, ...this.providers];
  },
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(AuthMiddleware).forRoutes(...authenticatedController);
  }
}
