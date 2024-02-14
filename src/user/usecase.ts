import { UserDataAccess } from "./data-access";
import { User } from "./entity";
import { RegisterInputDto } from "./input-dto";
import { v4 as uuidv4 } from "uuid";

export class RegisterUseCase {
  private userDataAccess: UserDataAccess;

  constructor(userDataAccess: UserDataAccess) {
    this.userDataAccess = userDataAccess;
  }

  public register = async ({
    username,
    email,
    password,
  }: RegisterInputDto): Promise<User> => {
    const userToRegister = new User(uuidv4(), username, email, password);

    const user = await this.userDataAccess.insertUser(userToRegister);

    return user;
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
