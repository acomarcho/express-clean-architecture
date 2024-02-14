import express, { Express } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { UserRepository } from "./user/repository";
import { LoginUseCase, RegisterUseCase } from "./user/usecase";
import { LoginController, RegisterController } from "./user/controller";
import { PgPool } from "./persistence/postgres";

dotenv.config();

const app: Express = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

const pgPool = new PgPool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "clean_architecture",
  password: process.env.DB_PASSWORD || "postgres",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
});

const userRepository = new UserRepository(pgPool);

const registerUseCase = new RegisterUseCase(userRepository);
const loginUseCase = new LoginUseCase(userRepository);

const registerController = new RegisterController(registerUseCase);
const loginController = new LoginController(loginUseCase);

app.use("/user", registerController.getRouter());
app.use("/user", loginController.getRouter());

app.listen(port, () => {
  console.log(`[Server]: Server is running at http://localhost:${port}`);
});
