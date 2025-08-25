export interface ILoginResponse {
  accessToken: string;
}

export interface IJwtPayload {
  sub: string;
  email: string;
  role: string;
}

export interface IUserJwtPayload {
  userId: string;
  email: string;
  role: string;
}
