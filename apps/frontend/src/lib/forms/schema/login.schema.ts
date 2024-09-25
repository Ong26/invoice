import isEmail from "validator/es/lib/isEmail";
import { z } from "zod";

export const LoginSchema = z.object({
	email: z.string().refine(isEmail, { message: "Invalid email" }),
	password: z.string().min(1, { message: "Required" }),
});
