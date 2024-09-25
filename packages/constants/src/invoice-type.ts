export const InvoiceTypes = [
	{
		Code: "01",
		Description: "Invoice",
	},
	{
		Code: "02",
		Description: "Credit Note",
	},
	{
		Code: "03",
		Description: "Debit Note",
	},
	{
		Code: "04",
		Description: "Refund Note",
	},
	{
		Code: "11",
		Description: "Self-billed Invoice",
	},
	{
		Code: "12",
		Description: "Self-billed Credit Note",
	},
	{
		Code: "13",
		Description: "Self-billed Debit Note",
	},
	{
		Code: "14",
		Description: "Self-billed Refund Note",
	},
].map((x) => ({ code: x.Code, description: x.Description }));
