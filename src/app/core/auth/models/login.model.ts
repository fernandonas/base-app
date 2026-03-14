export interface ILoginResponse {
  token: string;
  expiresIn: number;
}

export interface ILoginRequest {
  username: string;
  password: string;
}