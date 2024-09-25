import { EmptyInvoiceLineItem } from "@/lib/forms/data/invoice-line-item";
import { type InvoiceItem } from "@invoice/types/invoice-item";
import { create } from "zustand";

type InvoiceItemDialogState = {
	isOpen: boolean;
	toggleDialog: () => void;
	closeDialog: () => void;
	activeInvoiceItem: InvoiceItem | undefined;
	setActiveInvoiceItem: (invoiceItem: InvoiceItem | undefined) => void;
};

export const useInvoiceItemDialogStore = create<InvoiceItemDialogState>((set) => ({
	isOpen: false,
	closeDialog() {
		set({ isOpen: false, activeInvoiceItem: EmptyInvoiceLineItem });
	},
	toggleDialog: () => set(({ isOpen }) => ({ isOpen: !isOpen })),
	activeInvoiceItem: EmptyInvoiceLineItem,
	setActiveInvoiceItem: (activeInvoiceItem) => set({ activeInvoiceItem }),
}));
