export interface LoginResponse {
  access_token: string,
  username: string,
  email: string,
  id: string
}

export interface RegisterResponse {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
}