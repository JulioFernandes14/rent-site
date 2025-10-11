import { api } from "../../client";
import { HTTPError } from "ky";
import { TotalRentsResponse } from "../interfaces";
export async function getTotalRents(): Promise<TotalRentsResponse> {
  try {
    return await api.get('rents/total', {
      headers: { "Content-Type": "application/json" },
    }).json<TotalRentsResponse>();
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
