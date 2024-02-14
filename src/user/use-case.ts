import { UserDataAccess } from "./data-access";
import { User } from "./entity";
import { LoginIOBoundary, RegisterIOBoundary } from "./io-boundary";
import { LoginInputDto, RegisterInputDto } from "./input-dto";
import { v4 as uuidv4 } from "uuid";
import { RegisterOutputDto } from "./output-dto";

export class RegisterUseCase implements RegisterIOBoundary {
  private userDataAccess: UserDataAccess;

  constructor(userDataAccess: UserDataAccess) {
    this.userDataAccess = userDataAccess;
  }

  public register = async ({
    username,
    email,
    password,
  }: RegisterInputDto): Promise<RegisterOutputDto> => {
    const userToRegister = new User(uuidv4(), username, email, password);

    const user = await this.userDataAccess.insertUser(userToRegister);

    return {
      uuid: user.getUuid(),
      username: user.getUsername(),
      email: user.getEmail(),
      password: user.getPassword(),
    };
  };
}

export class LoginUseCase implements LoginIOBoundary {
  private userDataAccess: UserDataAccess;

  constructor(userDataAccess: UserDataAccess) {
    this.userDataAccess = userDataAccess;
  }

  public loginByEmail = async ({ email, password }: LoginInputDto) => {
    const userData = await this.userDataAccess.getUserByEmail(email);

    if (!userData) {
      return false;
    }

    if (userData.getPassword() !== password) {
      return false;
    }

    return true;
  };
}
