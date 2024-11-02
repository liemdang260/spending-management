export interface BaseModel {
  id: string;
  createdAt: number;
  updatedAt: number;
  deletedAt?: number;
}

export type IInitData<T extends BaseModel> = Omit<
  T,
  "id" | "createdAt" | "updatedAt"
>;
