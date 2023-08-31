import axios from 'axios';

interface CallApiCep {
  status: boolean;
  data?: any;
  error?: string;
}

export const callApiCep = async (cep: string): Promise<CallApiCep> => {
  const call = await axios
    .get(`https://viacep.com.br/ws/${cep}/json/`)
    .then((response) => {
      return { status: true, data: response.data };
    })
    .catch(() => {
      return {
        status: false,
        error: 'Não foi possível encontrar o CEP informado.',
      };
    });
  return call;
};
