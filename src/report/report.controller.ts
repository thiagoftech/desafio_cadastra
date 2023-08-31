import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ReportService } from './report.service';
import { FilterReportDto } from './dto/filter-report.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InternalServerErrorPresenter } from 'src/swagger/presenters/exceptions.presenter';

@ApiTags('Relatórios')
@Controller('relatorios')
export class ReportController {
  constructor(
    @Inject(ReportService)
    private readonly reportService: ReportService,
  ) {}

  @ApiOperation({ summary: 'Relatório de vendas' })
  @ApiResponse({
    status: 200,
    description: 'Relatório de vendas por tipo de pagamento.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: InternalServerErrorPresenter,
  })
  @Get('vendas_por_tipo_pagamento')
  async sales_by_payment_type(
    @Query() { data_inicio, data_fim }: FilterReportDto,
  ): Promise<{ tipo_pagamento: any; valor_total_vendas: any }[]> {
    const filters = {
      data_inicio,
      data_fim,
    };
    return this.reportService.sales_by_payment_type(filters);
  }

  @ApiOperation({ summary: 'Relatório de comissões' })
  @ApiResponse({
    status: 200,
    description: 'Relatório de comissões de vendedores.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: InternalServerErrorPresenter,
  })
  @Get('comissoes_por_vendedor')
  async sales_by_seller() {
    return this.reportService.sales_by_seller();
  }

  @ApiOperation({ summary: 'Relatório de clientes' })
  @ApiResponse({
    status: 200,
    description: 'Relatório de total de clientes.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: InternalServerErrorPresenter,
  })
  @Get('total_clientes')
  async total_customers(
    @Query() { data_inicio, data_fim, data, mes }: FilterReportDto,
  ) {
    const filters = {
      data_inicio,
      data_fim,
      data,
      mes,
    };
    return this.reportService.total_customers(filters);
  }
}
