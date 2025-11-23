import { injectable } from "tsyringe";
import { IRegistrationStrategy } from "./registration.service";

@injectable()
class OrganizerRegistration implements IRegistrationStrategy {
	constructor() {}
	register(data: any): Promise<any> {
		console.log(data);
		throw new Error("Method not implemented., organizer");
	}
}
export { OrganizerRegistration };
