import { User } from "./user";

export interface Host {
  id: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}
