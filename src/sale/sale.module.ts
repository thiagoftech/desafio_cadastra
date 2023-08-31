import { Module } from '@nestjs/common';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Sale, SaleSchema } from 'src/schemas/sale.schema';
import { PaymentType } from 'src/schemas/payment-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Sale.name, schema: SaleSchema },
      { name: PaymentType.name, schema: PaymentType },
    ]),
  ],
  controllers: [SaleController],
  providers: [SaleService],
})
export class SaleModule {}
