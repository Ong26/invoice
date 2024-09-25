import { z } from "zod";

export const requireAtLeastOneField = <T>(fields: Array<keyof T>) => {
	return (data: T, ctx: z.RefinementCtx) => {
		const hasAtLeastOneField = fields.some((field) => !!data[field]);

		if (!hasAtLeastOneField) {
			fields.forEach((field) =>
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "At least one field is required",
					path: [field as string],
				})
			);
		}
	};
};

export const intTransform = (minValue: number) => (val: string | number, ctx: z.RefinementCtx) => {
	const value = +val;
	if (isNaN(value)) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Not a number",
		});
	} else if (value < 0) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Required",
		});
	}
	return value;
};
type UnionStringNumberProps = {
	minValue?: number;
};
export const unionStringNumber = ({ minValue = 0 }: UnionStringNumberProps) =>
	z.union([z.string().transform(intTransform(minValue)), z.number().transform(intTransform(minValue))]);

type EmptyOrFulFillLengthProps = {
	length?: number;
	maxLength?: number;
};
export const emptyOrFulFillLengthIntUnion = ({ length = 0, maxLength = 0 }: EmptyOrFulFillLengthProps) => {
	const unions = [z.string().length(0, { message: "Invalid value" })];
	if (length > 0) {
		unions.push(z.string().length(length, { message: "Invalid value" }).regex(/^\d+$/, { message: "Invalid value" }));
	}
	if (maxLength > 0) {
		unions.push(z.string().max(maxLength, { message: "Invalid value" }).regex(/^\d+$/, { message: "Invalid value" }));
	}
	return unions as unknown as readonly [z.ZodTypeAny, z.ZodTypeAny, ...z.ZodTypeAny[]];
};

export const formatCurrencyMYR = (amount: number, withTag = true) => {
	if (withTag) return new Intl.NumberFormat("en-MY", { style: "currency", currency: "MYR" }).format(amount);
	return new Intl.NumberFormat("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount).replace("RM", "");
};
