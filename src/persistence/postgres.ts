import { Pool, PoolClient } from "pg";

export class PgPool {
  private pool;
  private client: null | PoolClient;

  constructor(data: {
    user: string;
    host: string;
    database: string;
    password: string;
    port: number;
  }) {
    this.pool = new Pool(data);
    this.client = null;
  }

  getClient = async () => {
    if (!this.client) {
      this.client = await this.pool.connect();
    }

    return this.client;
  };
}
