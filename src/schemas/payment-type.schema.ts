import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class PaymentType {
  @ApiProperty({
    example: 'Dinheiro',
    description: 'Nome do tipo de pagamento',
  })
  @Prop({
    type: String,
  })
  nome: string;

  @ApiProperty({
    example: 10,
    description: 'Percentual de comissão',
  })
  @Prop({
    type: Number,
  })
  perc_comissao: number;

  @ApiProperty({ example: true, description: 'Flag de exclusão lógica' })
  @Prop({
    type: Boolean,
    default: false,
  })
  deletado: boolean;
}

export const PaymentTypeSchema = SchemaFactory.createForClass(PaymentType);
