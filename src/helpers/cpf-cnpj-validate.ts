import { cpf, cnpj } from 'cpf-cnpj-validator';

export const cpfCnpjValidate = (value: string): boolean => {
  if (value.length === 11) {
    return cpf.isValid(value);
  } else if (value.length === 14) {
    return cnpj.isValid(value);
  } else {
    return false;
  }
};
