import { api } from "../../client";
import { HTTPError } from "ky";
import { Rent } from "../interfaces";
export async function getRents(): Promise<Rent[]> {
  try {
    return await api.get('rents', {
      headers: { "Content-Type": "application/json" },
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
