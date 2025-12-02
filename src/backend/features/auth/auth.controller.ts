import { inject, injectable } from "tsyringe";
import type {
  LoginRequestDTO,
  LoginResponseDTO,
  OAuthUserDTO,
  RegisterRequestDTO,
  RegisterResponseDTO,
} from "./dto/user.dto";
import type { IRegistrationStrategy } from "./registration/registration.service";
import { LoginService } from "./login/users.login.service";

export interface IAuthController {
  loginWithCredentials(loginDto: LoginRequestDTO): Promise<boolean>;
  LoginWithGoogle(user: OAuthUserDTO, googleId: string): Promise<boolean>;
  register(registerDto: RegisterRequestDTO): Promise<RegisterResponseDTO>;
}

@injectable()
class AuthController implements IAuthController {
  constructor(
    @inject("RegistrationService")
    private readonly registrationService: IRegistrationStrategy,
    @inject("LoginService") private readonly loginService: LoginService,
  ) {}

  async loginWithCredentials(loginDto: LoginRequestDTO): Promise<boolean> {
    if (!loginDto.email || !loginDto.password) {
      throw new Error("Email and password are required");
    }
    const response = this.loginService.login(loginDto);
    if (!response) {
      throw new Error("can find the user");
    }
    return response;
  }

  async LoginWithGoogle(user: OAuthUserDTO): Promise<boolean> {
    const savedUser = await this.loginService.findByEmail(
      user.email,
      user.provider!,
    );

    if (!savedUser) {
      const response = await this.registrationService.register(user);
      console.log(response)
      
    }
    return true;
  }

  async register(
    registerDto: RegisterRequestDTO,
  ): Promise<RegisterResponseDTO> {
    return await this.registrationService.register(registerDto);
  }
}

export default AuthController;
