import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString, Length } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    example: 'Joãozinho',
    description: 'Nome do cliente',
  })
  @IsString()
  nome: string;

  @ApiProperty({
    example: '14785945788',
    description: 'CPF',
  })
  @IsString()
  @Length(11, 14)
  cpf_cnpj: string;

  @ApiProperty({
    example: '25075095',
    description: 'CEP',
  })
  @IsString()
  @Length(8)
  cep: string;

  @ApiProperty({
    example: '64f08efd913db818df606fcc',
    description: 'MongoId do vendedor responsável',
  })
  @IsMongoId()
  vendedor: string;
}
