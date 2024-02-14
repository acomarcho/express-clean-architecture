export class User {
  private uuid: string;
  private username: string;
  private email: string;
  private password: string;

  constructor(uuid: string, username: string, email: string, password: string) {
    this.uuid = uuid;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  public getUuid = () => {
    return this.uuid;
  };

  public getUsername = () => {
    return this.username;
  };

  public getEmail = () => {
    return this.email;
  };

  public getPassword = () => {
    return this.password;
  };
}
