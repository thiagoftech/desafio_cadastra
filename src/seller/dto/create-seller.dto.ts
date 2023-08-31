import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsString, Max, Min } from 'class-validator';

export class CreateSellerDto {
  @ApiProperty({
    example: 'Vendedor Ciclano',
    description: 'Nome do vendedor',
  })
  @IsString()
  nome: string;

  @ApiProperty({
    example: '21987654321',
    description: 'Telefone',
  })
  @IsString()
  telefone: string;

  @ApiProperty({
    example: '1990-09-09',
    description: 'Data de Nascimento',
  })
  @IsDateString()
  dt_nasc: Date;

  @ApiProperty({
    example: '2020-10-15',
    description: 'Data de Admissão',
  })
  @IsDateString()
  dt_admissao: Date;

  @ApiProperty({
    example: 9,
    description: 'Hora de entrada no trabalho',
  })
  @IsInt()
  @Min(0)
  @Max(23)
  hora_inicio_trabalho: number;

  @ApiProperty({
    example: 18,
    description: 'Hora de saída no trabalho',
  })
  @IsInt()
  @Min(0)
  @Max(23)
  hora_final_trabalho: number;
}
