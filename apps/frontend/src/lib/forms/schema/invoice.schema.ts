import { z } from "zod";
export const InvoiceSchema = {
	title: z.string().min(1, { message: "Required" }),
	buyerId: z.string().min(1, { message: "Required" }),
	date: z.coerce.date(),
	paymentTerms: z.string(),
	time: z.string(),
	items: z.array(
		z.object({
			id: z.string().min(1, { message: "Required" }),
			description: z.string().min(1, { message: "Required" }),
			quantity: z.number().min(1, { message: "Required" }),
			unitPrice: z.number().min(1, { message: "Required" }),
			classification: z.string().min(1, { message: "Required" }),
		})
	),
};

export const CreateInvoiceSchema = z.object({
	...InvoiceSchema,
});
export const EditInvoiceSchema = z.object({
	id: z.string().min(1, { message: "Required" }),
	...InvoiceSchema,
});
