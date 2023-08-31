import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type SellerDocument = Seller & Document;

@Schema({
  toJSON: {
    virtuals: true,
  },
})
export class Seller {
  @ApiProperty({ example: 'Vendedor Fulano', description: 'Nome do vendedor' })
  @Prop({
    type: String,
  })
  nome: string;

  @ApiProperty({ example: '21998765432', description: 'Telefone' })
  @Prop({
    type: String,
  })
  telefone: string;

  @ApiProperty({ example: '1991-03-17', description: 'Data de nascimento' })
  @Prop({
    type: Date,
  })
  dt_nasc: Date;

  @ApiProperty({ example: '2019-04-04', description: 'Data de admissão' })
  @Prop({
    type: Date,
  })
  dt_admissao: Date;

  @ApiProperty({ example: 9, description: 'Hora de entrada' })
  @Prop({
    type: Number,
  })
  hora_inicio_trabalho: number;

  @ApiProperty({ example: 18, description: 'Hora de saída' })
  @Prop({
    type: Number,
  })
  hora_final_trabalho: number;

  @ApiProperty({
    example: true,
    description: 'Flag que sinaliza se está trabalhando ou não',
  })
  ativo: boolean;

  @ApiProperty({ example: true, description: 'Flag de exclusão lógica' })
  @Prop({
    type: Boolean,
    default: false,
  })
  deletado: boolean;
}

export const SellerSchema = SchemaFactory.createForClass(Seller);

SellerSchema.virtual('ativo').get(function (this: SellerDocument) {
  const now = new Date();
  const nowDateString = `${now.getFullYear()}-${
    now.getMonth() === 11 ? 1 : now.getMonth() + 1
  }-${now.getDate()}`;

  const dtStartJob = new Date(
    `${nowDateString} ${this.hora_inicio_trabalho}:00:00`,
  );
  const dtFinishJob = new Date(
    `${nowDateString} ${this.hora_final_trabalho}:00:00`,
  );

  const active = now >= dtStartJob && now <= dtFinishJob;
  return active;
});
