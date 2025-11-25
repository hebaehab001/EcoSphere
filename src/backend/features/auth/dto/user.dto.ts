import { TokenPayload } from "@/backend/interfaces/interfaces";
import { UserRole } from "../../user/user.model";

export type LoginRequestDTO = {
	email: string;
	password: string;
};

export type LoginResponse = {
	id: string;
	email: string;
	name: string;
	role: string;
};

export type RegisterRequestDTO = {
	email: string;
	name: string;
	password: string;
	birthDate: string;
	address: string;
	avatar: string;
	gender: string;
	phoneNumber: string;
	role: LoginTypes;
};

export type RegisterResponseDTO = {
	token: string;
	user: TokenPayload;
};

export type LoginTypes = UserRole | "shop";

export type FoundedUser = {
	_id: string;
	email: string;
	name: string;
	password: string;
	role: string;
	comparePassword?: (password: string) => Promise<boolean>;
};
