import express from "express";
import { ApiResponse } from "../response";
import { LoginIOBoundary, RegisterIOBoundary } from "./io-boundary";
import { loginRequestSchema, registerRequestSchema } from "./request";

export class RegisterController {
  private registerIOBoundary;
  private router;

  constructor(registerIOBoundary: RegisterIOBoundary) {
    this.registerIOBoundary = registerIOBoundary;
    this.router = express.Router();

    this.router.post("/register", async (req, res) => {
      const requestValidationResult = registerRequestSchema.safeParse(req.body);

      if (!requestValidationResult.success) {
        return res.status(400).json(new ApiResponse(null, "Incomplete fields"));
      }

      try {
        const { username, email, password } = requestValidationResult.data;

        const registerSuccessData = await this.registerIOBoundary.register({
          username,
          email,
          password,
        });

        return res.status(200).json(new ApiResponse(registerSuccessData));
      } catch (error) {
        return res.status(500).json(new ApiResponse(null, error));
      }
    });
  }

  public getRouter = () => {
    return this.router;
  };
}

export class LoginController {
  private loginIOBoundary;
  private router;

  constructor(loginIOBoundary: LoginIOBoundary) {
    this.loginIOBoundary = loginIOBoundary;
    this.router = express.Router();

    this.router.post("/login", async (req, res) => {
      const requestValidationResult = loginRequestSchema.safeParse(req.body);

      if (!requestValidationResult.success) {
        return res.status(400).json(new ApiResponse(null, "Incomplete fields"));
      }

      try {
        const { email, password } = requestValidationResult.data;

        const loginSuccessData = await this.loginIOBoundary.loginByEmail({
          email,
          password,
        });

        if (!loginSuccessData) {
          return res
            .status(400)
            .json(new ApiResponse({ success: false }, "Invalid credentials"));
        }

        return res
          .status(200)
          .json(new ApiResponse({ success: loginSuccessData }, null));
      } catch (error) {
        return res.status(500).json(new ApiResponse(null, error));
      }
    });
  }

  public getRouter = () => {
    return this.router;
  };
}
