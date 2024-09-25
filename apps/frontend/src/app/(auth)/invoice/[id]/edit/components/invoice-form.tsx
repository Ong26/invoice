"use client";
import { FormCombobox } from "@/components/form/form-combobox";
import { FormDatePicker } from "@/components/form/form-datepicker";
import { FormInput } from "@/components/form/form-input";
import { FormTextArea } from "@/components/form/form-textarea";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormLabel } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { INVOICE_API } from "@/lib/api";
import { patch } from "@/lib/api/fetch";
import { EditInvoiceSchema } from "@/lib/forms/schema/invoice.schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Buyer } from "@invoice/types/dist/buyer";
import { InvoiceItem } from "@invoice/types/invoice-item";
import { revalidateTag } from "next/cache";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { useTotalPriceStore } from "../../../stores/use-price-total";
import { InvoiceItemDialog } from "./invoice-item-dialog";
import InvoiceItemList from "./invoice-item-list";

type Props = {
	buyers: Buyer[];
	formValue: z.infer<typeof EditInvoiceSchema>;
};
const InvoiceForm = ({ buyers, formValue }: Props) => {
	const router = useRouter();
	const params = useParams();
	const form = useForm<z.infer<typeof EditInvoiceSchema>>({
		resolver: zodResolver(EditInvoiceSchema),
		defaultValues: formValue,
	});
	const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>(formValue.items);

	const { setTotalPrice } = useTotalPriceStore();
	const submitInvoice = form.handleSubmit(async (data) => {
		const { items, ...rest } = data;
		try {
			const res = await patch(`${INVOICE_API}/${rest.id}`, data);
			if (res.id) {
				toast("Success!", {
					description: "Invoice is updated",
					action: { label: "Edit", onClick: () => router.push(`/invoice/${res.id}/edit`) },
				});
				revalidateTag(`invoice_${res.id}`);
				revalidateTag("invoices");
			}
		} catch (error) {}
	});

	const onSubmitInvoiceItem = (item: InvoiceItem) => {
		const id = item.id;
		const itemIndex = invoiceItems.findIndex((x) => x.id === id);
		if (itemIndex === -1) {
			setInvoiceItems((value) => [...value, item]);
		} else {
			setInvoiceItems(invoiceItems.map((x) => (x.id === id ? item : x)));
		}
		revalidateTag(`invoice_${params.id}`);
		revalidateTag("invoices");
	};
	useEffect(() => {
		const calculateAndSetTotalPrice = (items: InvoiceItem[]) => {
			const totalPrice = items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
			setTotalPrice(totalPrice);
		};
		calculateAndSetTotalPrice(invoiceItems);
	}, [invoiceItems, setTotalPrice]);

	return (
		<>
			<InvoiceItemDialog onSubmitted={onSubmitInvoiceItem} />

			<Form {...form}>
				<form onSubmit={submitInvoice}>
					<div className="grid grid-cols-3 gap-x-2 gap-y-4 py-6">
						<div className="col-span-3 grid grid-cols-subgrid">
							<div className="col-span-3 lg::col-span-2 flex flex-col">
								<FormInput required label="Title / Description" name="title" control={form.control} />
							</div>
						</div>

						<div className="col-span-3 lg:col-span-1 flex flex-col">
							<FormCombobox
								placeholder="Select Buyer"
								label={
									<div className="mt-2 flex flex-row">
										<span className="required" aria-required>
											Buyer
										</span>
										<Link
											href="/buyer/create"
											type="button"
											className={cn(buttonVariants({ variant: "link" }), "-mt-1 ml-2 h-fit self-start px-0 py-0")}
										>
											Add new
										</Link>
									</div>
								}
								buttonClassName="mt-0"
								name="buyerId"
								data={buyers}
								control={form.control}
								labelField="name"
								valueField="id"
							/>
						</div>
						<div className="col-span-3 lg:col-span-1 flex flex-col">
							<FormDatePicker required label="Date" name="date" control={form.control} />
						</div>
						<div className="col-span-3 lg:col-span-1 flex flex-col">
							<FormInput required type="time" label="Time" name="time" control={form.control} />
						</div>
						<div className="col-span-3">
							<InvoiceItemList invoiceItems={invoiceItems} setInvoiceItems={setInvoiceItems} />
						</div>
						<div className="col-span-3">
							<Separator className="my-3" />
						</div>
						<div className="col-span-3">
							<FormLabel className="mt-0 text-lg font-bold">Additional Info</FormLabel>
						</div>

						<div className="col-span-3 flex flex-col">
							<FormTextArea
								placeholder="Please enter your payment terms here"
								label="Payment Terms"
								name="paymentTerms"
								rows={5}
								control={form.control}
							/>
						</div>
					</div>
					<div className="col-span-3 text-right">
						<Button type="submit" className="">
							Save
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
};

export default InvoiceForm;
