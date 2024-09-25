import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

export const post = async <T>(url: string, data: T) => {
	const response = await fetch(url, {
		method: "POST",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	return await response.json();
};

export const patch = async <T>(url: string, data: T) => {
	const response = await fetch(url, {
		method: "PATCH",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	return await response.json();
};

export const deleteReq = async (url: string) => {
	const response = await fetch(url, {
		method: "DELETE",
		credentials: "include",
	});
	return await response.json();
};

export const handlePostError = <T extends FieldValues>(res: any, form: UseFormReturn<T>) => {
	switch (res?.statusCode) {
		case 409:
			const uniqueFields = res?.fields;
			uniqueFields.forEach((field: Path<T>) => {
				form.setError(field, { message: `Please use a new value` });
			});
			toast.error("Fail", { description: "Error(s) in form" });
			break;
		default:
			toast.error(res?.message || "Something went wrong!");
			break;
	}
};
