import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Sale, SaleSchema } from 'src/schemas/sale.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sale.name, schema: SaleSchema }]),
  ],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
