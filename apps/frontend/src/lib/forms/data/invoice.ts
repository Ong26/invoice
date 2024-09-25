import { format } from "date-fns";

export const EmptyInvoiceForm = {
	buyerId: "",
	title: "",
	// invoiceTypeCode: "01",
	date: new Date(),
	time: format(new Date(), "HH:mm"),
	paymentTerms: "",
	items: [],
};
