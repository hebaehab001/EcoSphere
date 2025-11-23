import { IUser, UserRole } from "../user/user.model";
import { LoginRequestDTO, RegisterResponseDTO } from "./dto/user.dto";

export type LoginCommand = {
	email: string;
	password: string;
	userType: UserRole;
};

export type RegisterCommand = {
	user: Pick<IUser, "lastName" | "email" | "role" | "_id">;
} & { token: string };

export const mapLoginDtoToCommand = (dto: LoginRequestDTO): LoginCommand => {
	return {
		email: dto.email.toLowerCase(),
		password: dto.password,
		userType: mapStringToEnum(UserRole, dto.userType),
	};
};

export const mapRegisterResultToDto = (
	command: RegisterCommand
): RegisterResponseDTO => {
	return {
		token: command.token,
		user: {
			id: command.user._id!.toString(),
			email: command.user.email,
			lastName: command.user.lastName,
			role: command.user.role,
		},
	};
};

export const mapUserToPublicProfile = (user: IUser) => {
	return {
		id: user._id!.toString(),
		email: user.email,
		lastName: user.lastName,
		role: user.role,
	};
};

const mapStringToEnum = <T extends { [key: string]: string | number }>(
	enumObj: T,
	value: string
): T[keyof T] => {
	if (!Object.values(enumObj).includes(value as T[keyof T])) {
		throw new Error(`Invalid enum value: ${value}`);
	}
	return value as T[keyof T];
};
