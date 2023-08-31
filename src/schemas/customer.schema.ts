import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Seller } from './seller.schema';
import { ApiProperty } from '@nestjs/swagger';

@Schema({
  toJSON: {
    virtuals: true,
  },
})
export class Customer {
  @ApiProperty({ example: 'Cliente Fulano', description: 'Nome do cliente' })
  @Prop({
    type: String,
  })
  nome: string;

  @ApiProperty({ example: '14785945788', description: 'CPF ou CNPJ' })
  @Prop({
    type: String,
  })
  cpf_cnpj: string;

  @ApiProperty({ example: '25075095', description: 'Cep' })
  @Prop({
    type: String,
  })
  cep: string;

  @ApiProperty({ example: 'Logradouro', description: 'Logradouro' })
  @Prop({
    type: String,
  })
  logradouro: string;

  @ApiProperty({ example: 'Complemento', description: 'Complemento' })
  @Prop({
    type: String,
  })
  complemento: string;

  @ApiProperty({ example: 'Bairro', description: 'Bairro' })
  @Prop({
    type: String,
  })
  bairro: string;

  @ApiProperty({ example: 'Localidade', description: 'Localidade' })
  @Prop({
    type: String,
  })
  localidade: string;

  @ApiProperty({ example: 'UF', description: 'UF' })
  @Prop({
    type: String,
  })
  uf: string;

  @ApiProperty({ example: 'Ibge', description: 'Ibge' })
  @Prop({
    type: String,
  })
  ibge: string;

  @ApiProperty({ example: 'DDD', description: 'DDD' })
  @Prop({
    type: String,
  })
  ddd: string;

  @ApiProperty({
    example: '64f08efd913db818df606fcc',
    description: 'Vendedor responsável',
  })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Seller.name,
  })
  vendedor: string;

  @ApiProperty({ example: true, description: 'Flag de exclusão lógica' })
  @Prop({
    type: Boolean,
    default: false,
  })
  deletado: boolean;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

CustomerSchema.virtual('compras', {
  ref: 'Sale',
  localField: '_id',
  foreignField: 'cliente',
  justOne: false,
});
