import { injectable } from "tsyringe";
import { IRegistrationStrategy } from "./registration.service";

@injectable()
class ShopRegistration implements IRegistrationStrategy {
	constructor() {}
	register(data: any): Promise<any> {
		console.log(data);
		throw new Error("Method not implemented., shop");
	}
}
export { ShopRegistration };
