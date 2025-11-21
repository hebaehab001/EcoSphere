import { injectable } from "tsyringe";
import { IRegistrationStrategy } from "./RegistrationService";

@injectable()
class ShopRegistration implements IRegistrationStrategy {
	constructor() {}
	register<T, V>(data: T): Promise<V> | null {
		console.log(data);
		throw new Error("Method not implemented., shop");
	}
}
export { ShopRegistration };
