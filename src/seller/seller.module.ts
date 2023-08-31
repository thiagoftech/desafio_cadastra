import { Module } from '@nestjs/common';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Seller, SellerSchema } from 'src/schemas/seller.schema';
import { Sale, SaleSchema } from 'src/schemas/sale.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Seller.name, schema: SellerSchema },
      { name: Sale.name, schema: SaleSchema },
    ]),
  ],
  controllers: [SellerController],
  providers: [SellerService],
})
export class SellerModule {}
