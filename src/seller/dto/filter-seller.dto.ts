import { IsBoolean, IsOptional } from 'class-validator';

export class FilterSellerDto {
  @IsOptional()
  @IsBoolean()
  ativo: boolean;
}
