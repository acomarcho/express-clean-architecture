import { User } from "./entity";

export interface UserDataAccess {
  getUserByEmail: (email: string) => Promise<User | null>;
  insertUser: (user: User) => Promise<User>;
}
