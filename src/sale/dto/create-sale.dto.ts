import { IsDateString, IsMongoId, IsNumber } from 'class-validator';

export class CreateSaleDto {
  @IsMongoId()
  cliente: string;

  @IsMongoId()
  vendedor: string;

  @IsDateString()
  data: Date;

  @IsNumber()
  valor: number;

  @IsMongoId()
  tipo_pagamento: string;
}
