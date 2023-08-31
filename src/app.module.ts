import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentTypeModule } from './payment-type/payment-type.module';
import { SellerModule } from './seller/seller.module';
import { CustomerModule } from './customer/customer.module';
import { SaleModule } from './sale/sale.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/cadastra_api'),
    PaymentTypeModule,
    SellerModule,
    CustomerModule,
    SaleModule,
    ReportModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
