import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useInvoiceItemDialogStore } from "@/lib/stores/invoice-item-dialog";
import { InvoiceItem } from "@invoice/types/invoice-item";
import { Plus } from "lucide-react";
import InvoiceItemForm from "./invoice-item-form";
type InvoiceItemDialogProps = {
	onSubmitted?: (item: InvoiceItem) => void;
};
export const AddInvoiceButton = () => {
	const { toggleDialog: toggleInvoiceItemDialog } = useInvoiceItemDialogStore();
	return (
		<Button type="button" variant="default" className="ml-2 size-8 rounded-full p-1" onClick={toggleInvoiceItemDialog}>
			<Plus strokeWidth={4} size={14} />
		</Button>
	);
};

export const InvoiceItemDialog = ({ onSubmitted }: InvoiceItemDialogProps) => {
	const { isOpen, toggleDialog } = useInvoiceItemDialogStore();
	return (
		<Dialog open={isOpen} onOpenChange={toggleDialog}>
			<DialogContent aria-describedby="Create a new invoice item" className="max-h-[90%] min-h-[60%] max-w-[425px] overflow-y-scroll md:max-w-[90%]">
				<DialogHeader>
					<DialogTitle>Invoice Item</DialogTitle>
				</DialogHeader>
				<InvoiceItemForm onSubmitted={onSubmitted} />
			</DialogContent>
		</Dialog>
	);
};
