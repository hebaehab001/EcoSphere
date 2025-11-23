import { inject, injectable } from "tsyringe";
import type { IRegistrationFactory } from "./registration.strategy.factory";

interface IRegistrationStrategy {
	register(data: any): Promise<any>;
}

@injectable()
class RegistrationService {
	constructor(
		@inject("RegistrationFactory")
		private readonly strategyFactory: IRegistrationFactory
	) {}

	async register(data: any) {
		console.log(data);
		const strategy = this.strategyFactory.getStrategy(data.userType);
		return await strategy.register(data);
	}
}

export { RegistrationService, type IRegistrationStrategy };
