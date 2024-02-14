import { User } from "./entity";
import { UserDataAccess } from "./data-access";
import { PgPool } from "../persistence/postgres";
import { UserModel } from "./model";

export class UserRepository implements UserDataAccess {
  pool: PgPool;

  constructor(pool: PgPool) {
    this.pool = pool;
  }

  getUserByEmail = async (email: string) => {
    const client = await this.pool.getClient();

    const users = await client.query<UserModel>(
      `
        SELECT
          uuid,
          username,
          email,
          password
        FROM
          users
        WHERE
          email = $1
      `,
      [email]
    );

    if (!users.rowCount) {
      return null;
    }

    const userModel = users.rows[0];

    return new User(
      userModel.uuid,
      userModel.username,
      userModel.email,
      userModel.password
    );
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
