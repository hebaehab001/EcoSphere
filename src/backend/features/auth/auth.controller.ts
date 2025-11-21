import { inject, injectable } from "tsyringe";
import { User } from "@/generated/prisma/client";
import type { IAuthService } from "./auth.service";
import type { LoginDto, RegisterDto } from "./dto/user.dto";
import type { IRegistrationStrategy } from "./registration/RegistrationService";
import type { ILoginStrategy } from "./login/login.service";

@injectable()
class AuthController {
	constructor(
		@inject("IAuthService") private readonly IAuthService: IAuthService,
		@inject("RegistrationService")
		private readonly registrationService: IRegistrationStrategy,
		@inject("LoginService") private readonly loginService: ILoginStrategy
	) {}

	async login(
		loginDto: LoginDto
	): Promise<{ token: string; user: Omit<User, "password"> } | null> {
		// return await this.IAuthService.login(loginDto);
		return await this.loginService.login(loginDto);
	}

	async register(
		registerDto: RegisterDto
	): Promise<{ token: string; user: Omit<User, "password"> } | null> {
		return await this.registrationService.register(registerDto);
	}
}

export default AuthController;
