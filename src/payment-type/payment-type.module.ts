import { Module } from '@nestjs/common';
import { PaymentTypeController } from './payment-type.controller';
import { PaymentTypeService } from './payment-type.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PaymentType,
  PaymentTypeSchema,
} from 'src/schemas/payment-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PaymentType.name, schema: PaymentTypeSchema },
    ]),
  ],
  controllers: [PaymentTypeController],
  providers: [PaymentTypeService],
})
export class PaymentTypeModule {}
