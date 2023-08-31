import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import {
  FindAllPagination,
  findAllConfiguration,
} from 'src/helpers/find-all-pagination-rules';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { FilterSaleDto } from './dto/filter-saler.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Sale } from 'src/schemas/sale.schema';
import {
  InternalServerErrorPresenter,
  NotFoundPresenter,
} from 'src/swagger/presenters/exceptions.presenter';

@ApiTags('Vendas')
@Controller('vendas')
export class SaleController {
  constructor(
    @Inject(SaleService)
    private readonly saleService: SaleService,
  ) {}

  @ApiOperation({ summary: 'Listagem de vendas' })
  @ApiResponse({
    status: 200,
    description: 'Listagem completa das vendas cadastradas.',
    type: [Sale],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: InternalServerErrorPresenter,
  })
  @Get()
  async findAll(
    @Query() { type, page, limit }: FindAllPagination,
    @Query() { cliente, vendedor, tipo_pagamento, data }: FilterSaleDto,
  ) {
    const paginationConfiguration = findAllConfiguration({ type, page, limit });
    const filters = {
      cliente,
      vendedor,
      tipo_pagamento,
      data,
    };
    return this.saleService.findAll(paginationConfiguration, filters);
  }

  @ApiOperation({ summary: 'Visualização de uma venda' })
  @ApiResponse({
    status: 200,
    description: 'Visualização completa de uma venda cadastrada.',
    type: Sale,
  })
  @ApiResponse({
    status: 404,
    description: 'Venda não encontrada.',
    type: NotFoundPresenter,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: InternalServerErrorPresenter,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleService.findOne(id);
  }

  @ApiOperation({ summary: 'Cadastro de uma venda' })
  @ApiResponse({
    status: 201,
    description: 'Cadastro de uma venda.',
    type: Sale,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: InternalServerErrorPresenter,
  })
  @Post()
  async create(
    @Body()
    {
      cliente,
      vendedor,
      data: data_venda,
      valor,
      tipo_pagamento,
    }: CreateSaleDto,
  ) {
    const data = {
      cliente,
      vendedor,
      data: data_venda,
      valor,
      tipo_pagamento,
    };
    return this.saleService.create(data);
  }

  @ApiOperation({ summary: 'Alteração de uma venda' })
  @ApiResponse({
    status: 200,
    description: 'Alteração de uma venda cadastrada.',
    type: Sale,
  })
  @ApiResponse({
    status: 404,
    description: 'Venda não encontrada.',
    type: NotFoundPresenter,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: InternalServerErrorPresenter,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body()
    {
      cliente,
      vendedor,
      data: data_venda,
      valor,
      tipo_pagamento,
    }: UpdateSaleDto,
  ) {
    return this.saleService.update(id, {
      cliente,
      vendedor,
      data: data_venda,
      valor,
      tipo_pagamento,
    });
  }

  @ApiOperation({ summary: 'Exclusão lógica de uma venda' })
  @ApiResponse({
    status: 204,
    description: 'Exclusão lógica de uma venda cadastrada.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: InternalServerErrorPresenter,
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return this.saleService.delete(id);
  }
}
