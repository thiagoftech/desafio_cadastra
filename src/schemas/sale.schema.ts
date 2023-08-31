import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { PaymentType } from './payment-type.schema';
import { Seller } from './seller.schema';
import { Customer } from './customer.schema';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Sale {
  @ApiProperty({
    example: '64f08efd913db818df606fcc',
    description: 'Cliente da venda',
  })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Customer.name,
  })
  cliente: string;

  @ApiProperty({
    example: '64f08efd913db818df606fcc',
    description: 'Vendedor da venda',
  })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Seller.name,
  })
  vendedor: string;

  @ApiProperty({
    example: '2023-08-31',
    description: 'Data da venda',
  })
  @Prop({
    type: Date,
  })
  data: Date;

  @ApiProperty({
    example: 100.5,
    description: 'Valor da venda',
  })
  @Prop({
    type: Number,
  })
  valor: number;

  @ApiProperty({
    example: '64f08efd913db818df606fcc',
    description: 'Tipo de pagamento da venda',
  })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: PaymentType.name,
  })
  tipo_pagamento: string;

  @ApiProperty({
    example: 10,
    description: 'Percentual de comissão',
  })
  @Prop({
    type: Number,
  })
  perc_comissao: number;

  @ApiProperty({
    example: 10.5,
    description: 'Comissão',
  })
  @Prop({
    type: Number,
  })
  comissao: number;

  @ApiProperty({ example: true, description: 'Flag de exclusão lógica' })
  @Prop({
    type: Boolean,
    default: false,
  })
  deletado: boolean;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
