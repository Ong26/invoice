import { PartialKeys } from "./helpers";
import { type InvoiceItem } from "./invoice-item";
export type Invoice = {
	id: string;
	buyerId: string;
	title: string;
	invoiceTypeCode?: string;
	paymentTerms: string;
	date: Date;
	time: string;
	items: InvoiceItem[];
	totalIncludingTax?: number;
	totalAmount?: number;
	total?: number;
};

export type CreateInvoice = PartialKeys<Invoice, "id" | "totalIncludingTax">;
