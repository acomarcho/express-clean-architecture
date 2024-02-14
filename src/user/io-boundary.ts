import { LoginInputDto, RegisterInputDto } from "./input-dto";
import { LoginOutputDto, RegisterOutputDto } from "./output-dto";

export interface RegisterIOBoundary {
  register: (inputDto: RegisterInputDto) => Promise<RegisterOutputDto>;
}

export interface LoginIOBoundary {
  loginByEmail: (inputDto: LoginInputDto) => Promise<LoginOutputDto>;
}
