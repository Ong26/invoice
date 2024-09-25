import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

export const isValidCUID = (cuid: string) => {
	const cuidRegex = /^c[0-9a-z]{24}$/;
	return cuidRegex.test(cuid);
};

export const createFormData = <T extends object>(data: T, emptyForm: T) => {
	const formData = handleData(data, emptyForm);
	return formData;
};

const handleData = <T>(data: T, emptyForm: T) => {
	const newData = {} as T;
	for (const key in data) {
		if (typeof data[key] === "object" && data[key] !== null) {
			newData[key] = handleData(data[key], emptyForm[key]);
		} else {
			newData[key] = data[key] ?? emptyForm[key];
		}
	}
	return newData;
};
