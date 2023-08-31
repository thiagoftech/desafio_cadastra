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
import { SellerService } from './seller.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import {
  FindAllPagination,
  findAllConfiguration,
} from 'src/helpers/find-all-pagination-rules';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Seller } from 'src/schemas/seller.schema';
import {
  InternalServerErrorPresenter,
  NotFoundPresenter,
} from 'src/swagger/presenters/exceptions.presenter';

@ApiTags('Vendedores')
@Controller('vendedores')
export class SellerController {
  constructor(
    @Inject(SellerService)
    private readonly sellerService: SellerService,
  ) {}

  @ApiOperation({ summary: 'Listagem de vendedores' })
  @ApiResponse({
    status: 200,
    description: 'Listagem completa dos vendedores cadastrados.',
    type: [Seller],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: InternalServerErrorPresenter,
  })
  @Get()
  async findAll(
    @Query() { type, page, limit }: FindAllPagination,

    @Query('ativo')
    ativo: string,
  ) {
    const paginationConfiguration = findAllConfiguration({ type, page, limit });
    const filters: any = {};
    if (typeof ativo !== 'undefined') {
      if (['true', '1'].includes(ativo.toLowerCase())) {
        filters.ativo = true;
      } else if (['false', '0'].includes(ativo.toLowerCase())) {
        filters.ativo = false;
      }
    }
    return this.sellerService.findAll(paginationConfiguration, filters);
  }

  @ApiOperation({ summary: 'Visualização de um vendedor' })
  @ApiResponse({
    status: 200,
    description: 'Visualização completa de um vendedor cadastrado.',
    type: Seller,
  })
  @ApiResponse({
    status: 404,
    description: 'Vendedor não encontrado.',
    type: NotFoundPresenter,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: InternalServerErrorPresenter,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellerService.findOne(id);
  }

  @ApiOperation({ summary: 'Cadastro de um vendedor' })
  @ApiResponse({
    status: 201,
    description: 'Cadastro de um vendedor.',
    type: Seller,
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
      nome,
      dt_nasc,
      telefone,
      dt_admissao,
      hora_inicio_trabalho,
      hora_final_trabalho,
    }: CreateSellerDto,
  ) {
    const data = {
      nome,
      dt_nasc,
      telefone,
      dt_admissao,
      hora_inicio_trabalho,
      hora_final_trabalho,
    };
    return this.sellerService.create(data);
  }

  @ApiOperation({ summary: 'Alteração de um vendedor' })
  @ApiResponse({
    status: 200,
    description: 'Alteração de um vendedor cadastrado.',
    type: Seller,
  })
  @ApiResponse({
    status: 404,
    description: 'Vendedor não encontrado.',
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
      nome,
      dt_nasc,
      telefone,
      dt_admissao,
      hora_inicio_trabalho,
      hora_final_trabalho,
    }: UpdateSellerDto,
  ) {
    const data = {
      nome,
      dt_nasc,
      telefone,
      dt_admissao,
      hora_inicio_trabalho,
      hora_final_trabalho,
    };
    return this.sellerService.update(id, data);
  }

  @ApiOperation({ summary: 'Exclusão lógica de um vendedor' })
  @ApiResponse({
    status: 204,
    description: 'Exclusão lógica de um vendedor cadastrado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: InternalServerErrorPresenter,
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return this.sellerService.delete(id);
  }
}
