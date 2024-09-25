import { zodResolver } from "@hookform/resolvers/zod";

import { InvoiceItem } from "@invoice/types/dist/invoice-item";

import { useInvoiceItemDialogStore } from "@/lib/stores/invoice-item-dialog";
// import { Button, Form, FormCombobox, FormDescription, FormInput, FormLabel, FormTextArea, Separator } from "@/components";
import { Separator } from "@/components/ui/separator";

import ViewField from "@/components/layout/view/field";
import { Label } from "@/components/ui/label";
import { formatCurrencyMYR } from "@/lib/forms/schema/helper";
import { CreateInvoiceItemSchemaOnEdit } from "@/lib/forms/schema/invoice-item.schema";
import { RequiredKeys } from "@invoice/types/dist/helpers/index";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";

type InvoiceItemContentProps = {
	onSubmitted?: (item: InvoiceItem) => void;
};

const InvoiceItemContent = ({ onSubmitted }: InvoiceItemContentProps) => {
	const { activeInvoiceItem, closeDialog } = useInvoiceItemDialogStore();
	const invoiceId = useParams().id as string;
	const form = useForm<RequiredKeys<InvoiceItem, "invoiceId">>({
		resolver: zodResolver(CreateInvoiceItemSchemaOnEdit),
		defaultValues: { ...activeInvoiceItem, invoiceId },
	});

	const subtotal = activeInvoiceItem?.unitPrice! * activeInvoiceItem?.quantity! || 1;
	return (
		<div className="grid gap-4 py-4 px-2">
			<div className="grid grid-cols-3 items-center gap-4">
				<ViewField fieldClassName="md:col-span-3" label="Name/Description" value={activeInvoiceItem?.description} />
				<ViewField label="Unit Price" value={activeInvoiceItem?.unitPrice} />
				<ViewField label="Quantity" value={activeInvoiceItem?.quantity} />

				<ViewField label="Classification" value={activeInvoiceItem?.classification} />

				<Separator className="my-2 col-span-3" />

				<div className="col-span-3">
					<Label>Summary</Label>
				</div>
				<ViewField label="Subtotal" value={formatCurrencyMYR(subtotal)} />
			</div>
		</div>
	);
};

export default InvoiceItemContent;
