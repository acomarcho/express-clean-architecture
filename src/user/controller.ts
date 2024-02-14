import express from "express";
import { LoginUseCase, RegisterUseCase } from "./usecase";
import { registerRequestSchema } from "./request";
import { ApiResponse } from "../response";

export class RegisterController {
  private registerUseCase;
  private router;

  constructor(registerUseCase: RegisterUseCase) {
    this.registerUseCase = registerUseCase;
    this.router = express.Router();

    this.router.post("/register", async (req, res) => {
      const requestValidationResult = registerRequestSchema.safeParse(req.body);

      if (!requestValidationResult.success) {
        return res.status(400).json(new ApiResponse(null, "Incomplete fields"));
      }

      try {
        const { username, email, password } = requestValidationResult.data;

        const registerSuccessData = await this.registerUseCase.register({
          username,
          email,
          password,
        });

        res.status(200).json(new ApiResponse(registerSuccessData));
      } catch (error) {
        res.status(500).json(new ApiResponse(null, error));
      }
    });
  }

  public getRouter = () => {
    return this.router;
  };
}

export class LoginController {
  private loginUseCase;
  private router;

  constructor(loginUseCase: LoginUseCase) {
    this.loginUseCase = loginUseCase;
    this.router = express.Router();

    this.router.post("/login", (req, res) => {
      console.log(req);
      res.status(200).json({ message: "ok" });
    });
  }

  public getRouter = () => {
    return this.router;
  };
}
