import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seller } from 'src/schemas/seller.schema';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { FindAllInterface } from 'src/helpers/find-all-pagination-rules';
import { FilterSellerDto } from './dto/filter-seller.dto';
import { Sale } from 'src/schemas/sale.schema';

@Injectable()
export class SellerService {
  constructor(
    @InjectModel(Seller.name)
    private sellerModel: Model<Seller>,
    @InjectModel(Sale.name)
    private saleModel: Model<Sale>,
  ) {}

  async findAll(
    paginationConfiguration: FindAllInterface,
    filters: FilterSellerDto = null,
  ): Promise<Seller[]> {
    const query: any = {
      deletado: false,
    };
    if (typeof filters.ativo !== 'undefined') {
      const now = new Date();
      const hour = now.getHours();
      if (filters.ativo) {
        query.hora_inicio_trabalho = { $lte: hour };
        query.hora_final_trabalho = { $gte: hour };
      } else {
        query['$or'] = [
          {
            hora_inicio_trabalho: { $gt: hour },
          },
          { hora_final_trabalho: { $lt: hour } },
        ];
      }
    }

    const builder = this.sellerModel.find(query);
    if (paginationConfiguration.type === 'paginate') {
      builder.limit(paginationConfiguration.limit);
      builder.skip(
        paginationConfiguration.limit * (paginationConfiguration.page - 1),
      );
    }
    return builder.exec();
  }

  async validateExists(id: string) {
    const sellerExists = await this.sellerModel.findById(id).countDocuments();
    if (!sellerExists) {
      throw new NotFoundException('Vendedor não encontrado');
    }
  }

  async findOne(id: string) {
    const seller = await this.sellerModel.findById(id).exec();
    if (seller === null) {
      throw new NotFoundException('Vendedor não encontrado');
    }
    const sales = await this.saleModel.aggregate([
      {
        $group: {
          _id: {
            year_month: {
              $dateToString: {
                format: '%Y-%m',
                date: '$data',
              },
            },
          },
          valor_total_vendas: { $sum: '$valor' },
          quantidade: { $sum: 1 },
          valor_total_comissao: {
            $sum: '$comissao',
          },
        },
      },
      {
        $sort: {
          '_id.year_moth': -1,
        },
      },
    ]);

    const sellerDetail: any = seller.toJSON();
    sellerDetail.vendas = sales.map((sale) => {
      return {
        ano_mes: sale._id.year_month,
        quantidade: sale.quantidade,
        valor_total_vendas: sale.valor_total_vendas,
        valor_total_comissao: sale.valor_total_comissao,
      };
    });

    return sellerDetail;
  }

  async create(data: CreateSellerDto) {
    const createSeller = new this.sellerModel({
      nome: data.nome,
      dt_nasc: data.dt_nasc,
      telefone: data.telefone,
      dt_admissao: data.dt_admissao,
      hora_inicio_trabalho: data.hora_inicio_trabalho,
      hora_final_trabalho: data.hora_final_trabalho,
    });
    return createSeller.save();
  }

  async update(id: string, data: UpdateSellerDto): Promise<Seller> {
    await this.validateExists(id);

    // TODO: Validate if name already exists
    const updateSeller = await this.sellerModel.findById(id).exec();
    if (data.nome) {
      updateSeller.nome = data.nome;
    }
    if (data.dt_nasc) {
      updateSeller.dt_nasc = data.dt_nasc;
    }
    if (data.telefone) {
      updateSeller.telefone = data.telefone;
    }
    if (data.dt_admissao) {
      updateSeller.dt_admissao = data.dt_admissao;
    }
    if (data.hora_inicio_trabalho) {
      updateSeller.hora_inicio_trabalho = data.hora_inicio_trabalho;
    }
    if (data.hora_final_trabalho) {
      updateSeller.hora_final_trabalho = data.hora_final_trabalho;
    }
    return updateSeller.save();
  }

  async delete(id: string): Promise<void> {
    await this.validateExists(id);

    await this.sellerModel.findById(id).updateOne({ deletado: true });
    return;
  }
}
