import { api } from "../../client";
import { RegisterResponse } from "../interface";
import { HTTPError } from "ky";
import CryptoJS from 'crypto-js';

export async function register(
  username: string,
  email: string,
  password: string
): Promise<RegisterResponse> {
  try {
    const hasedPassword = CryptoJS.SHA256(password).toString()
    return await api.post('users', {
      json: { username, email, password: hasedPassword },
      headers: { "Content-Type": "application/json" },
    }).json<RegisterResponse>();
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
