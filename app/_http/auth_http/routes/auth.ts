import { KyResponse } from "ky";
import { api } from "../../client";
import { LoginResponse } from "../interface";

export async function login(
  username: string,
  password: string
): Promise<KyResponse<LoginResponse>> {
  return await api.post<LoginResponse>('auth/login', { 
    json: { username, password },
    headers: {
      "Content-Type": "application/json",
    },
  });
}
