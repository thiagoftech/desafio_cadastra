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
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerService } from './customer.service';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import {
  FindAllPagination,
  findAllConfiguration,
} from 'src/helpers/find-all-pagination-rules';
import { FilterCustomerDto } from './dto/filter-customer.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Customer } from 'src/schemas/customer.schema';
import {
  InternalServerErrorPresenter,
  NotFoundPresenter,
} from 'src/swagger/presenters/exceptions.presenter';

@ApiTags('Clientes')
@Controller('clientes')
export class CustomerController {
  constructor(
    @Inject(CustomerService)
    private readonly customerService: CustomerService,
  ) {}

  @ApiOperation({ summary: 'Listagem de clientes' })
  @ApiResponse({
    status: 200,
    description: 'Listagem completa dos clientes cadastrados.',
    type: [Customer],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: InternalServerErrorPresenter,
  })
  @Get()
  async findAll(
    @Query() { type, page, limit }: FindAllPagination,
    @Query() { nome, cpf_cnpj, cep }: FilterCustomerDto,
  ) {
    const paginationConfiguration = findAllConfiguration({ type, page, limit });
    const filters = {
      nome,
      cpf_cnpj,
      cep,
    };
    return this.customerService.findAll(paginationConfiguration, filters);
  }

  @ApiOperation({ summary: 'Visualização de um cliente' })
  @ApiResponse({
    status: 200,
    description: 'Visualização completa de um cliente cadastrado.',
    type: Customer,
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente não encontrado.',
    type: NotFoundPresenter,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: InternalServerErrorPresenter,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @ApiOperation({ summary: 'Cadastro de um cliente' })
  @ApiResponse({
    status: 201,
    description: 'Cadastro de um cliente.',
    type: Customer,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: InternalServerErrorPresenter,
  })
  @Post()
  async create(@Body() { nome, cpf_cnpj, cep, vendedor }: CreateCustomerDto) {
    const data = {
      nome,
      cpf_cnpj,
      cep,
      vendedor,
    };
    return this.customerService.create(data);
  }

  @ApiOperation({ summary: 'Alteração de um cliente' })
  @ApiResponse({
    status: 200,
    description: 'Alteração de um cliente cadastrado.',
    type: Customer,
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente não encontrado.',
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
    { nome, cpf_cnpj, cep, vendedor }: UpdateCustomerDto,
  ) {
    return this.customerService.update(id, {
      nome,
      cpf_cnpj,
      cep,
      vendedor,
    });
  }

  @ApiOperation({ summary: 'Exclusão lógica de um cliente' })
  @ApiResponse({
    status: 204,
    description: 'Exclusão lógica de um cliente cadastrado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: InternalServerErrorPresenter,
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return this.customerService.delete(id);
  }
}
