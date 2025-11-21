import { injectable } from "tsyringe";
import { IRegistrationStrategy } from "./RegistrationService";

@injectable()
class EndUserRegistration implements IRegistrationStrategy {
	constructor() {}
	register<IUser, V>(data: IUser): Promise<V> | null {
		console.log(data);
		throw new Error("Method not implemented., end user");
	}
}

export { EndUserRegistration };
