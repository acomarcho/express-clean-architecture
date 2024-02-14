import { User } from "./entity";
import { RegisterInputDto } from "./input-dto";
import { RegisterOutputDto } from "./output-dto";

export interface UserDataAccess {
  getUserByEmail: (email: string) => Promise<User>;
  insertUser: (user: User) => Promise<void>;
}

export class RegisterUseCase {
  private userDataAccess: UserDataAccess;

  constructor(userDataAccess: UserDataAccess) {
    this.userDataAccess = userDataAccess;
  }

  public register = async ({
    username,
    email,
    password,
  }: RegisterInputDto): Promise<RegisterOutputDto> => {
    const userToRegister = new User(
      new Date().toISOString(),
      username,
      email,
      password
    );

    await this.userDataAccess.insertUser(userToRegister);

    return {
      username,
      email,
      password,
    };
  };
}

export class LoginUseCase {
  private userDataAccess: UserDataAccess;

  constructor(userDataAccess: UserDataAccess) {
    this.userDataAccess = userDataAccess;
  }

  public loginByEmail = async (email: string, password: string) => {
    const userData = await this.userDataAccess.getUserByEmail(email);

    if (userData.getPassword() === password) {
      return true;
    }

    return false;
  };
}
