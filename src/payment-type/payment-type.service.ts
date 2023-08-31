import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentType } from 'src/schemas/payment-type.schema';
import { CreatePaymentTypeDto } from './dto/create-payment-type.dto';
import { UpdatePaymentTypeDto } from './dto/update-payment-type.dto';

@Injectable()
export class PaymentTypeService {
  constructor(
    @InjectModel(PaymentType.name)
    private paymentTypeModel: Model<PaymentType>,
  ) {}

  async findAll(): Promise<PaymentType[]> {
    return this.paymentTypeModel
      .find({
        deletado: false,
      })
      .exec();
  }

  async validateExists(id: string) {
    const paymentTypeExists = await this.paymentTypeModel
      .findById(id)
      .countDocuments();
    if (!paymentTypeExists) {
      throw new NotFoundException('Tipo de pagamento não encontrado');
    }
  }

  async findOne(id: string): Promise<PaymentType> {
    const paymentType = await this.paymentTypeModel.findById(id).exec();
    if (paymentType === null) {
      throw new NotFoundException('Tipo de pagamento não encontrado');
    }
    return paymentType;
  }

  async create(data: CreatePaymentTypeDto): Promise<PaymentType> {
    const createPaymentType = new this.paymentTypeModel({
      nome: data.nome,
      perc_comissao: data.perc_comissao,
    });
    return createPaymentType.save();
  }

  async update(id: string, data: UpdatePaymentTypeDto): Promise<PaymentType> {
    await this.validateExists(id);

    // TODO: Validate if name already exists
    const updatedPaymentType = await this.paymentTypeModel.findById(id).exec();
    if (data.nome) {
      updatedPaymentType.nome = data.nome;
    }
    if (data.perc_comissao) {
      updatedPaymentType.perc_comissao = data.perc_comissao;
    }
    return updatedPaymentType.save();
  }

  async delete(id: string): Promise<void> {
    await this.validateExists(id);

    await this.paymentTypeModel.findById(id).updateOne({ deletado: true });
    return;
  }
}
