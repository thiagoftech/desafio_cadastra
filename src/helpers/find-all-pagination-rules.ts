import { ApiProperty } from '@nestjs/swagger';

enum FindAllType {
  PAGINATE = 'paginate',
  LIST = 'list',
}

export interface FindAllInterface {
  type: FindAllType;
  page?: number;
  limit?: number;
}

export class FindAllPagination implements FindAllInterface {
  @ApiProperty({
    example: 'paginate',
    enum: ['paginate', 'list'],
    description: 'Tipos de listagem: Paginado ou geral',
    required: false,
  })
  type: FindAllType;

  @ApiProperty({
    example: 1,
    description: 'Página atual (apenas para o tipo paginado)',
    required: false,
  })
  page?: number;

  @ApiProperty({
    example: 10,
    description:
      'Quantidade de registros por página (apenas para o tipo paginado)',
    required: false,
  })
  limit?: number;
}

export function findAllConfiguration(query: any): FindAllInterface {
  const type =
    !query.type || query.type === 'paginate'
      ? FindAllType.PAGINATE
      : FindAllType.LIST;
  const page = query.page ? parseInt(query.page, 10) : 1;
  const limit = query.limit ? parseInt(query.limit, 10) : 10;
  return {
    type,
    page,
    limit,
  };
}
