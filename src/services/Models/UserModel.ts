import { BaseModel } from "./baseModel";

export interface IUser extends BaseModel {
  id: string;
  name: string;
  email: string;
  providerId: string;
  providerData: any;
  photoURL: string;
  createdAt: number;
  updatedAt: number;
}
