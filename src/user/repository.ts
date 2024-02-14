import { User } from "./entity";
import { UserDataAccess } from "./data-access";
import { PgPool } from "../persistence/postgres";

export class UserRepository implements UserDataAccess {
  pool: PgPool;

  constructor(pool: PgPool) {
    this.pool = pool;
  }

  getUserByEmail = (email: string) => {
    return new Promise<User>((resolve) => {
      resolve(new User("1", "2", "3", "4"));
    });
  };

  insertUser = async (user: User) => {
    const client = await this.pool.getClient();

    await client.query(
      `
        INSERT INTO
          users (uuid, username, email, password)
        VALUES
          ($1, $2, $3, $4)
      `,
      [user.getUuid(), user.getUsername(), user.getEmail(), user.getPassword()]
    );

    return user;
  };
}
