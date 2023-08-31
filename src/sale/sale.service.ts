import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sale } from 'src/schemas/sale.schema';
import { CreateSaleDto } from './dto/create-sale.dto';
import { FindAllInterface } from 'src/helpers/find-all-pagination-rules';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { FilterSaleDto } from './dto/filter-saler.dto';
import { Seller } from 'src/schemas/seller.schema';
import { PaymentType } from 'src/schemas/payment-type.schema';

@Injectable()
export class SaleService {
  constructor(
    @InjectModel(Sale.name)
    private saleModel: Model<Sale>,
    @InjectModel(PaymentType.name)
    private paymentTypeModel: Model<PaymentType>,
  ) {}

  async findAll(
    paginationConfiguration: FindAllInterface,
    filters: FilterSaleDto = null,
  ): Promise<Sale[]> {
    const query: any = {
      deletado: false,
    };

    if (filters?.cliente) {
      query.cliente = filters.cliente;
    }
    if (filters?.vendedor) {
      query.vendedor = filters.vendedor;
    }
    if (filters?.tipo_pagamento) {
      query.tipo_pagamento = filters.tipo_pagamento;
    }
    if (filters?.data) {
      query.data = filters.data;
    }

    const builder = this.saleModel
      .find(query)
      .populate(['cliente', 'vendedor', 'tipo_pagamento']);
    if (paginationConfiguration.type === 'paginate') {
      builder.limit(paginationConfiguration.limit);
      builder.skip(
        paginationConfiguration.limit * (paginationConfiguration.page - 1),
      );
    }
    return builder.exec();
  }

  async validateExists(id: string) {
    const saleExists = await this.saleModel.findById(id).countDocuments();
    if (!saleExists) {
      throw new NotFoundException('Venda não encontrada');
    }
  }

  async findOne(id: string): Promise<Sale> {
    const customer = await this.saleModel
      .findById(id)
      .populate(['cliente', 'vendedor', 'tipo_pagamento'])
      .exec();
    if (customer === null) {
      throw new NotFoundException('Venda não encontrada');
    }
    return customer;
  }

  async create(data: CreateSaleDto): Promise<Sale> {
    const paymentType = await this.paymentTypeModel
      .findById(data.tipo_pagamento)
      .exec();
    const createSale = new this.saleModel({
      cliente: data.cliente,
      vendedor: data.vendedor as unknown as Seller,
      data: data.data,
      valor: data.valor,
      tipo_pagamento: data.tipo_pagamento,
      comissao: data.valor * (paymentType.perc_comissao / 100),
      perc_comissao: paymentType.perc_comissao,
    });
    return createSale.save();
  }

  async update(id: string, data: UpdateSaleDto): Promise<Sale> {
    await this.validateExists(id);

    const updateSale = await this.saleModel.findById(id).exec();
    if (data.cliente) {
      updateSale.cliente = data.cliente;
    }
    if (data.vendedor) {
      updateSale.vendedor = data.vendedor;
    }
    if (data.data) {
      updateSale.data = data.data;
    }
    if (data.valor) {
      updateSale.valor = data.valor;
    }
    if (data.tipo_pagamento) {
      const paymentType = await this.paymentTypeModel
        .findById(data.tipo_pagamento)
        .exec();
      updateSale.tipo_pagamento = data.tipo_pagamento;
      updateSale.comissao = data.valor * (paymentType.perc_comissao / 100);
      updateSale.perc_comissao = paymentType.perc_comissao;
    }
    return updateSale.save();
  }

  async delete(id: string): Promise<void> {
    await this.validateExists(id);

    await this.saleModel.findById(id).updateOne({ deletado: true });
    return;
  }
}
