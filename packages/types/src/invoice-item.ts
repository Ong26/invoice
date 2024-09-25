export type InvoiceItem = {
	id: string;
	classification: string;
	description: string;
	unitPrice: number;
	quantity: number;
	discountRate?: number | boolean;
	taxType?: string;
	taxRate?: number;
	taxAmount?: number;
	taxExemptionDetails?: string;
	amountExemptedFromTax?: number;
	totalExcludingTax?: number;
	invoiceId?: string;
};
