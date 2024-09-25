import { z } from "zod";
import { unionStringNumber } from "./helper";

const InvoiceItemSchema = {
	classification: z.coerce.string().min(1, { message: "Required" }),
	description: z.string().min(1, { message: "Required" }),
	unitPrice: unionStringNumber({ minValue: 0.01 }),
	quantity: unionStringNumber({ minValue: 0.01 }),
	subtotal: z.number().min(0, { message: "Required" }),
	// taxType: z.string().min(1, { message: "Required" }),
	// taxRate: unionStringNumber({ minValue: 0 }),
	// taxAmount: unionStringNumber({ minValue: 0 }),
	// taxExemptionDetails: z.string().optional(),
	// amountExemptedFromTax: z.number().optional(),
	// totalExcludingTax: z.number().min(0, { message: "Required" }),
	// discountRate: z.union([z.number().optional(), z.boolean().optional()]),
};

export const CreateInvoiceItemSchema = z.object({
	...InvoiceItemSchema,
});
export const CreateInvoiceItemSchemaOnEdit = z.object({
	...InvoiceItemSchema,
	invoiceId: z.string().min(1, { message: "Required" }),
});

export const UpdateInvoiceItemSchema = z.object({
	id: z.string().min(1, { message: "Required" }),
	...InvoiceItemSchema,
});
