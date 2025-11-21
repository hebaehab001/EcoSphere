import { inject, injectable } from "tsyringe";
import type { IRegistrationFactory } from "./RegistrationStrategyFactory";
import { IUser } from "../../user/user.model";

interface IRegistrationStrategy {
	register<T, V>(data: T): Promise<V> | null;
}

@injectable()
class RegistrationService {
	constructor(
		@inject("RegistrationFactory")
		private readonly strategyFactory: IRegistrationFactory
	) {}

	async register<T extends IUser>(data: T) {
		const strategy = this.strategyFactory.getStrategy(data.userType);
		return await strategy.register(data);
	}
}

export { RegistrationService, type IRegistrationStrategy };
