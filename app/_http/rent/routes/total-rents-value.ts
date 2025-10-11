import { api } from "../../client";
import { HTTPError } from "ky";
import { TotalRentsValueResponse } from "../interfaces";
export async function getTotalRentsValue(): Promise<TotalRentsValueResponse> {
  try {
    return await api.get('rents/total-value', {
      headers: { "Content-Type": "application/json" },
    }).json<TotalRentsValueResponse>();
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
