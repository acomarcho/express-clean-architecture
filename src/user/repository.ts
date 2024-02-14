import { User } from "./entity";
import { UserDataAccess } from "./usecase";

export class UserRepository implements UserDataAccess {
  constructor() {}

  getUserByEmail = (email: string) => {
    return new Promise<User>((resolve) => {
      resolve(new User("1", "2", "3", "4"));
    });
  };

  insertUser = (user: User) => {
    return new Promise<void>((resolve) => {
      resolve();
    });
  };
}
