import { api } from "../../client";
import { HTTPError } from "ky";
import { TotalRentsResponse } from "../interfaces";

export async function getTotalRents(params?: { startDate?: string; endDate?: string }): Promise<TotalRentsResponse> {
  try {
    const searchParams: Record<string, string> = {};
    if (params?.startDate) searchParams.startDate = params.startDate;
    if (params?.endDate) searchParams.endDate = params.endDate;

    return await api.get('rents/total', {
      headers: { "Content-Type": "application/json" },
      searchParams,
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
