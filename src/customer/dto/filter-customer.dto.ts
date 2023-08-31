import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterCustomerDto {
  @ApiProperty({
    example: 'Ciclano',
    description: 'Filtro de nome do cliente',
    required: false,
  })
  @IsOptional()
  @IsString()
  nome: string;

  @ApiProperty({
    example: '14785945788',
    description: 'Filtro de CPF do cliente',
    required: false,
  })
  @IsOptional()
  @IsString()
  cpf_cnpj: string;

  @ApiProperty({
    example: '25075095',
    description: 'Filtro de CEP do cliente',
    required: false,
  })
  @IsOptional()
  @IsString()
  cep: string;
}
