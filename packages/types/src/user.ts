export type User = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	username: string;
	role: string;
	password: string;
	isDeleted: boolean;
};

export type JwtUser = User & {
	iat: number;
	exp: number;
};
