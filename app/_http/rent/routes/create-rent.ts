import { api } from "../../client";
import { HTTPError } from "ky";
import { RentCreateResponse, RentItemRequest } from "../interfaces";
import { enviarNotificacao } from "../../../register";
export async function createRent(rentItems: RentItemRequest[]): Promise<RentCreateResponse> {
  try {
    const response = await api.post('rents', {
      headers: { "Content-Type": "application/json" },
      json: {
        items: rentItems
      }
    }).json<RentCreateResponse>();

    enviarNotificacao('Aluguel cadastrado com sucesso ✅', 'Acesse o dashboard para verificar o novo aluguel cadastrado.');
    return response;
  } catch (err: unknown) {
    if (err instanceof HTTPError) {
      const body = await err.response.json();
      throw new Error(body.message || "Erro desconhecido");
    }
    if (err instanceof Error) {
      throw err;
    }
    throw new Error("Erro inesperado");
  }
}
