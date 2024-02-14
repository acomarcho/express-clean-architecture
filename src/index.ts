import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { UserRepository } from "./user/repository";
import { LoginUseCase, RegisterUseCase } from "./user/usecase";
import { LoginController, RegisterController } from "./user/controller";

dotenv.config();

const app: Express = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

const userRepository = new UserRepository();

const registerUseCase = new RegisterUseCase(userRepository);
const loginUseCase = new LoginUseCase(userRepository);

const registerController = new RegisterController(registerUseCase);
const loginController = new LoginController(loginUseCase);

app.use("/user", registerController.getRouter());
app.use("/user", loginController.getRouter());

app.listen(port, () => {
  console.log(`[Server]: Server is running at http://localhost:${port}`);
});
