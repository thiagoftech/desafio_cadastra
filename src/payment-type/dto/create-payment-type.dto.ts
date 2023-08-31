import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreatePaymentTypeDto {
  @ApiProperty({
    example: 'Dinheiro',
    description: 'Nome do tipo de pagamento',
  })
  @IsString()
  nome: string;

  @ApiProperty({
    example: 10,
    description: 'Percentual de comissão',
  })
  @IsNumber()
  perc_comissao: number;
}
