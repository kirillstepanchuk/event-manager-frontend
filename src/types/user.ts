export interface LoginData {
  email: string
  password: string
}

export interface SignupData {
  email: string
  firstName: string
  lastName: string
  password: string
}

export interface EditUserData {
  firstName: string
  lastName: string
  description: string
}

export interface CurrentUserData {
  id: number
}

export interface UserData {
  email: string
  firstName: string
  lastName: string
  userId: number
  token?: string
  description?: string
  avatar?: string
  phoneNumber?: string
  role: string
}

export interface ClientData {
  id: number,
  email: string,
  firstName: string,
  lastName: string,
  description: string,
  role: string,
  isBlocked: boolean,
}

export interface ClientSearchData {
  page: number,
  role: string,
  blocked: string,
  title: string,
}

export interface UserDataPayloadSuccess {
  users: ClientData[],
  pageCount: number,
}

export interface EditClientData extends EditUserData {
  role: string
  clientId: string
}

export interface ClientEvents {
  eventsType: string
  id: string
}

export interface UserCategorie {
  category_name: string
}

export interface Client {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
}

export type ClientsFormValues = {
  clients: Client[];
};
