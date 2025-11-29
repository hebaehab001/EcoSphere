import { TokenPayload } from "@/backend/interfaces/interfaces";
import { UserRole } from "../../user/user.model";

export type LoginRequestDTO = {
	email: string;
	password: string;
	loginType: LoginTypes;
};

export type LoginResponseDTO = {
	token: string;
	user: TokenPayload;
};

export type RegisterRequestDTO = {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
	birthDate: string;
	address: string;
	avatar?: string;
	gender: string;
	phoneNumber: string;
	role: LoginTypes;
    // Shop specific
    location?: string;
    workingHours?: string;
    description?: string;
    hotline?: string;
    name?: string;
};

// Type for the mapped user profile (what the frontend receives)
export type PublicUserProfile = {
    _id: string;
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    name?: string; // For restaurants
    phoneNumber?: string;
    address?: string;
    location?: string; // For restaurants
    avatar: string; // Always a string URL, not an object
    birthDate?: string;
    gender?: string;
    role: string;
    points?: number;
    favoritesIds?: string[];
    cart?: any[];
    paymentHistory?: any[];
    subscriptionPeriod?: Date | string;
    subscribed?: boolean;
    events?: any[];
    workingHours?: string; // For restaurants
    description?: string; // For restaurants
    menu?: any[];
    reviews?: any[];
    hotline?: number;
};

export type RegisterResponseDTO = {
	token: string;
	user: TokenPayload;
};

export type LoginTypes = UserRole | "shop";
