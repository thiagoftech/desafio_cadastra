import { ApiProperty } from '@nestjs/swagger';

export class NotFoundPresenter {
  @ApiProperty({
    example: 'Objeto não encontrado',
  })
  message: string;

  @ApiProperty({
    example: 'Not Found',
  })
  error: string;

  @ApiProperty({
    example: 404,
  })
  statusCode: number;
}

export class InternalServerErrorPresenter {
  @ApiProperty({
    example: 'Internal Server Error',
  })
  error: string;

  @ApiProperty({
    example: 500,
  })
  statusCode: number;
}
