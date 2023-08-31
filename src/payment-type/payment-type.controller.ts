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
} from '@nestjs/common';
import { PaymentTypeService } from './payment-type.service';
import { CreatePaymentTypeDto } from './dto/create-payment-type.dto';
import { UpdatePaymentTypeDto } from './dto/update-payment-type.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  InternalServerErrorPresenter,
  NotFoundPresenter,
} from 'src/swagger/presenters/exceptions.presenter';
import { PaymentType } from 'src/schemas/payment-type.schema';

@ApiTags('Tipo de pagamentos')
@Controller('tipo_pagamentos')
export class PaymentTypeController {
  constructor(
    @Inject(PaymentTypeService)
    private readonly paymentTypeService: PaymentTypeService,
  ) {}

  @ApiOperation({ summary: 'Listagem de tipos de pagamento' })
  @ApiResponse({
    status: 200,
    description: 'Listagem completa dos tipos de pagamento cadastrados.',
    type: [PaymentType],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: InternalServerErrorPresenter,
  })
  @Get()
  async findAll() {
    return this.paymentTypeService.findAll();
  }

  @ApiOperation({ summary: 'Visualização de um tipo de pagamento' })
  @ApiResponse({
    status: 200,
    description: 'Visualização completa de um tipo de pagamento cadastrado.',
    type: PaymentType,
  })
  @ApiResponse({
    status: 404,
    description: 'Tipo de pagamento não encontrado.',
    type: NotFoundPresenter,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: InternalServerErrorPresenter,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentTypeService.findOne(id);
  }

  @ApiOperation({ summary: 'Cadastro de um tipo de pagamento' })
  @ApiResponse({
    status: 201,
    description: 'Cadastro de um tipo de pagamento.',
    type: PaymentType,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: InternalServerErrorPresenter,
  })
  @Post()
  async create(
    @Body()
    { nome, perc_comissao }: CreatePaymentTypeDto,
  ) {
    return this.paymentTypeService.create({
      nome,
      perc_comissao,
    });
  }

  @ApiOperation({ summary: 'Alteração de um tipo de pagamento' })
  @ApiResponse({
    status: 200,
    description: 'Alteração de um tipo de pagamento cadastrado.',
    type: PaymentType,
  })
  @ApiResponse({
    status: 404,
    description: 'Tipo de pagamento não encontrado.',
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
    { nome, perc_comissao }: UpdatePaymentTypeDto,
  ) {
    return this.paymentTypeService.update(id, {
      nome,
      perc_comissao,
    });
  }

  @ApiOperation({ summary: 'Exclusão lógica de um tipo de pagamento' })
  @ApiResponse({
    status: 204,
    description: 'Exclusão lógica de um tipo de pagamento cadastrado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: InternalServerErrorPresenter,
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return this.paymentTypeService.delete(id);
  }
}
