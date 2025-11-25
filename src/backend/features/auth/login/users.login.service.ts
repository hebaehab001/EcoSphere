import { inject, injectable } from "tsyringe";
import { type IAuthRepository } from "../auth.repository";
import type { LoginRequestDTO, LoginResponse } from "../dto/user.dto";
import { mapToUserPublicProfile } from "../mappers";

@injectable()
class LoginService {
	constructor(
		@inject("IAuthRepository") private readonly authRepository: IAuthRepository
	) {}
	async login(data: LoginRequestDTO): Promise<LoginResponse> {
		let user = await this.authRepository.findShopByEmail(data.email);

		if (!user) user = await this.authRepository.findUserByEmail(data.email);
		if (!user) throw new Error("User not found");

		if (!(await user.comparePassword!(data.password)))
			throw new Error("Invalid email or password");
		const publicProfile = mapToUserPublicProfile(user);
		return publicProfile;
	}
}

export { LoginService };
