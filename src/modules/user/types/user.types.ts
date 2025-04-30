export interface IUserProps {
  email: string;
  password: string;
}

export interface ICreateUserProps {
  email: string;
  password: string;
}

export interface IGetUserResponse {
  email: string;
  id: string;
}
