"use client";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { Form, FormLabel } from "@/components/ui/form";
import { LOGIN_API } from "@/lib/api";
import { handlePostError, post } from "@/lib/api/fetch";
import { LoginSchema } from "@/lib/forms/schema/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type UserCredentials = { email: string; password: string };
const LoginForm = () => {
	const router = useRouter();
	const form = useForm<UserCredentials>({
		resolver: zodResolver(LoginSchema),
		defaultValues: { email: "", password: "" },
	});
	const submitForm = async (values: UserCredentials) => {
		try {
			const res = await post(LOGIN_API, values);
			if (res.accessToken) {
				localStorage.setItem("accessToken", res.accessToken);
				router.replace("/");
				router.refresh();
				return;
			}
			handlePostError(res, form);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Form {...form}>
			<form id="login-form" onSubmit={form.handleSubmit(submitForm)} className="space-y-4">
				<div className="flex flex-col">
					<FormLabel>Email</FormLabel>
					<div className="mt-2 flex flex-1 flex-row gap-x-2">
						<FormInput name="email" control={form.control} inputMode="email" wrapperClassName="w-full" />
					</div>
				</div>
				<div className="flex flex-col">
					<FormLabel>Password</FormLabel>
					<div className="mt-2 flex flex-1 flex-row gap-x-2">
						<FormInput name="password" control={form.control} inputMode="email" type="password" wrapperClassName="w-full" />
					</div>
				</div>

				<div className="text-right">
					<Button>Login</Button>
				</div>
			</form>
		</Form>
	);
};

export default LoginForm;
