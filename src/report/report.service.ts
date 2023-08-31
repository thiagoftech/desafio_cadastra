import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sale } from 'src/schemas/sale.schema';
import { FilterReportDto } from './dto/filter-report.dto';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Sale.name)
    private saleModel: Model<Sale>,
  ) {}

  async sales_by_payment_type(filters: FilterReportDto) {
    const match: any = {};
    if (filters?.data_inicio && filters?.data_fim) {
      match.data = {
        $gte: new Date(filters.data_inicio),
        $lte: new Date(filters.data_fim),
      };
    }
    const data = await this.saleModel.aggregate([
      { $match: match },
      { $unwind: '$tipo_pagamento' },
      {
        $lookup: {
          from: 'paymenttypes',
          localField: 'tipo_pagamento',
          foreignField: '_id',
          as: 'tipo_pagamento_joined',
        },
      },
      { $unwind: '$tipo_pagamento_joined' },
      {
        $group: {
          _id: {
            tipo_pagamento: '$tipo_pagamento',
            nome: '$tipo_pagamento_joined.nome',
          },
          valor_total_vendas: { $sum: '$valor' },
        },
      },
    ]);

    const dataMapped = data.map((item) => {
      return {
        tipo_pagamento: item._id.nome,
        valor_total_vendas: item.valor_total_vendas,
      };
    });

    return dataMapped;
  }

  async sales_by_seller() {
    const data = await this.saleModel.aggregate([
      { $unwind: '$vendedor' },
      {
        $lookup: {
          from: 'sellers',
          localField: 'vendedor',
          foreignField: '_id',
          as: 'vendedor_joined',
        },
      },
      { $unwind: '$vendedor_joined' },
      {
        $group: {
          _id: {
            id_vendedor: '$vendedor',
            nome: '$vendedor_joined.nome',
          },
          valor_total_comissao: { $sum: '$comissao' },
        },
      },
    ]);

    const dataMapped = data.map((item) => {
      return {
        vendedor: item._id.nome,
        valor_total_comissao: item.valor_total_comissao,
      };
    });

    return dataMapped;
  }

  async total_customers(filters: FilterReportDto) {
    const match: any = {};
    const addFields: any = {};
    if (filters?.data_inicio && filters?.data_fim) {
      match.data = {
        $gte: new Date(filters.data_inicio),
        $lte: new Date(filters.data_fim),
      };
    }
    if (filters?.data) {
      match.data = new Date(filters.data);
    }
    if (filters?.mes) {
      addFields.month = {
        $month: '$data',
      };
      match.month = Number(filters.mes);
    }

    const data = await this.saleModel.aggregate([
      { $addFields: addFields },
      { $match: match },
      {
        $group: {
          _id: {
            cliente: '$cliente',
          },
        },
      },
      {
        $count: 'total_clientes',
      },
    ]);

    return data[0];
  }
}
