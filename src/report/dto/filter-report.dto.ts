import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class FilterReportDto {
  @ApiProperty({
    example: '2023-08-01',
    description: 'Filtro de data inicial',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  data_inicio?: string;

  @ApiProperty({
    example: '2023-08-31',
    description: 'Filtro de data final',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  data_fim?: string;

  @ApiProperty({
    example: '2023-08-15',
    description: 'Filtro de Data',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  data?: string;

  @ApiProperty({
    example: '8',
    description: 'Filtro de mês',
    required: false,
  })
  @IsOptional()
  @IsString()
  mes?: string;
}
