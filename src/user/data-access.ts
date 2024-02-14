import { User } from "./entity";

export interface UserDataAccess {
  getUserByEmail: (email: string) => Promise<User>;
  insertUser: (user: User) => Promise<User>;
}
