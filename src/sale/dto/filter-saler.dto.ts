import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class FilterSaleDto {
  @ApiProperty({
    example: '64f09054913db818df606fdf',
    description: 'Filtro de vendedor',
    required: false,
  })
  @IsOptional()
  vendedor: string;

  @ApiProperty({
    example: '64f09054913db818df606fdf',
    description: 'Filtro de vendedor',
    required: false,
  })
  @IsOptional()
  cliente: string;

  @ApiProperty({
    example: '64f09054913db818df606fdf',
    description: 'Filtro de tipo de pagamento',
    required: false,
  })
  @IsOptional()
  tipo_pagamento: string;

  @ApiProperty({
    example: '2023-08-20',
    description: 'Filtro de data da venda',
    required: false,
  })
  @IsOptional()
  data: Date;
}
