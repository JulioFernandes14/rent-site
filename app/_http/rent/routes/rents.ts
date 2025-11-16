import { api } from "../../client";
import { HTTPError } from "ky";
import { Rent } from "../interfaces";

export async function getRents(params?: { startDate?: string; endDate?: string }): Promise<Rent[]> {
  try {
    const searchParams: Record<string, string> = {};
    if (params?.startDate) searchParams.startDate = params.startDate;
    if (params?.endDate) searchParams.endDate = params.endDate;

    return await api.get('rents', {
      headers: { "Content-Type": "application/json" },
      searchParams,
    }).json<Rent[]>();
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
