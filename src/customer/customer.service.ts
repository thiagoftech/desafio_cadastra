import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from 'src/schemas/customer.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { callApiCep } from 'src/helpers/cep';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { FindAllInterface } from 'src/helpers/find-all-pagination-rules';
import { FilterCustomerDto } from './dto/filter-customer.dto';
import { cpfCnpjValidate } from 'src/helpers/cpf-cnpj-validate';
import { Seller } from 'src/schemas/seller.schema';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name)
    private customerModel: Model<Customer>,
  ) {}

  async findAll(
    paginationConfiguration: FindAllInterface,
    filters: FilterCustomerDto = null,
  ): Promise<Customer[]> {
    const query: any = {
      deletado: false,
    };

    if (filters?.nome) {
      query.nome = { $regex: filters.nome, $options: 'i' };
    }
    if (filters?.cpf_cnpj) {
      query.cpf_cnpj = filters.cpf_cnpj;
    }
    if (filters?.cep) {
      query.cep = filters.cep;
    }

    const builder = this.customerModel.find(query).populate(['vendedor']);
    if (paginationConfiguration.type === 'paginate') {
      builder.limit(paginationConfiguration.limit);
      builder.skip(
        paginationConfiguration.limit * (paginationConfiguration.page - 1),
      );
    }
    return builder.exec();
  }

  async validateExists(id: string) {
    const customerExists = await this.customerModel
      .findById(id)
      .countDocuments();
    if (!customerExists) {
      throw new NotFoundException('Cliente não encontrado');
    }
  }

  async validateCpfCnpj(cpf_cnpj: string) {
    const isValid = cpfCnpjValidate(cpf_cnpj);
    if (!isValid) {
      throw new BadRequestException('CPF/CNPJ inválido');
    }
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerModel
      .findById(id)
      .populate('vendedor')
      .populate('compras')
      .exec();
    if (customer === null) {
      throw new NotFoundException('Cliente não encontrado');
    }
    return customer;
  }

  async create(data: CreateCustomerDto): Promise<Customer> {
    // TODO: Validate if cpf_cnpj already exists
    const cepIntegration = await callApiCep(data.cep);
    if (!cepIntegration.status) {
      throw new BadRequestException(cepIntegration.error);
    }

    await this.validateCpfCnpj(data.cpf_cnpj);

    const createCustomer = new this.customerModel({
      nome: data.nome,
      cpf_cnpj: data.cpf_cnpj,
      cep: data.cep,
      logradouro: cepIntegration.data.logradouro,
      bairro: cepIntegration.data.bairro,
      complemento: cepIntegration.data.complemento,
      localidade: cepIntegration.data.localidade,
      uf: cepIntegration.data.uf,
      ibge: cepIntegration.data.ibge,
      ddd: cepIntegration.data.ddd,
      vendedor: data.vendedor as unknown as Seller,
    });
    return createCustomer.save();
  }

  async update(id: string, data: UpdateCustomerDto): Promise<Customer> {
    await this.validateExists(id);

    // TODO: Validate if name already exists
    const updateCustomer = await this.customerModel.findById(id).exec();
    if (data.nome) {
      updateCustomer.nome = data.nome;
    }
    if (data.cpf_cnpj) {
      await this.validateCpfCnpj(data.cpf_cnpj);

      updateCustomer.cpf_cnpj = data.cpf_cnpj;
    }
    if (data.cep !== updateCustomer.cep) {
      const cepIntegration = await callApiCep(data.cep);
      if (!cepIntegration.status) {
        throw new BadRequestException(cepIntegration.error);
      }
      updateCustomer.cep = data.cep;
      updateCustomer.logradouro = cepIntegration.data.logradouro;
      updateCustomer.bairro = cepIntegration.data.bairro;
      updateCustomer.complemento = cepIntegration.data.complemento;
      updateCustomer.localidade = cepIntegration.data.localidade;
      updateCustomer.uf = cepIntegration.data.uf;
      updateCustomer.ibge = cepIntegration.data.ibge;
      updateCustomer.ddd = cepIntegration.data.ddd;
    }
    if (data.vendedor) {
      updateCustomer.vendedor = data.vendedor;
    }
    return updateCustomer.save();
  }

  async delete(id: string): Promise<void> {
    await this.validateExists(id);

    await this.customerModel.findById(id).updateOne({ deletado: true });
    return;
  }
}
