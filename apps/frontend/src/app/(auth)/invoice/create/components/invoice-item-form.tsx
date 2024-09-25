import { zodResolver } from "@hookform/resolvers/zod";
import { Classifications } from "@invoice/constants/dist/classification";

import { CreateInvoiceItemSchema } from "@/lib/forms/schema/invoice-item.schema";
import { InvoiceItem } from "@invoice/types/invoice-item";

import { useInvoiceItemDialogStore } from "@/lib/stores/invoice-item-dialog";
// import { Button, Form, FormCombobox, FormDescription, FormInput, FormLabel, FormTextArea, Separator } from "@/components";
import { FormCombobox } from "@/components/form/form-combobox";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { Form, FormDescription, FormLabel } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

import { useMemo } from "react";
import { useForm } from "react-hook-form";

type InvoiceItemFormProps = {
	onSubmitted?: (item: InvoiceItem) => void;
};

const InvoiceItemForm = ({ onSubmitted }: InvoiceItemFormProps) => {
	const { activeInvoiceItem, closeDialog } = useInvoiceItemDialogStore();
	const form = useForm<InvoiceItem>({
		resolver: zodResolver(CreateInvoiceItemSchema),
		defaultValues: activeInvoiceItem,
	});
	const submitForm = (values: InvoiceItem) => {
		const invoiceItem = { ...activeInvoiceItem, ...values };
		if (!invoiceItem?.id) {
			invoiceItem.id = crypto.randomUUID();
		}
		onSubmitted && onSubmitted(invoiceItem);
		closeDialog();
	};

	const subtotal = useMemo(() => {
		const unitPrice = +form.watch("unitPrice");
		const quantity = +form.watch("quantity");
		const subtotal = unitPrice * quantity || 0;
		const formatted = subtotal.toFixed(2);
		return +formatted;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.watch("unitPrice"), form.watch("quantity")]);

	return (
		<Form {...form}>
			<form id="form-invoice-item" onSubmit={form.handleSubmit(submitForm)} className="px-2">
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-3 items-center gap-4">
						<div className="col-span-3">
							<FormInput label="Name / Description" name="description" required control={form.control} />
						</div>
						<div className="col-span-1">
							<FormInput
								required
								label="Unit Price"
								name="unitPrice"
								control={form.control}
								type="number"
								inputMode="decimal"
								step={0.01}
								min={0.01}
							/>
						</div>
						<div className="col-span-1">
							<FormInput required label="Quantity" name="quantity" control={form.control} type="number" inputMode="decimal" step={0.1} min={1} />
						</div>
						<div className="col-span-1">
							<FormCombobox
								required
								label="Classification"
								data={Classifications}
								name="classification"
								control={form.control}
								labelField={"description"}
								valueField={"code"}
							/>
						</div>

						{/* <div className="col-span-1">
							<FormCombobox
								data={TaxTypes}
								label="Tax Type"
								name="taxType"
								labelField={"description"}
								valueField={"code"}
								control={form.control}
								onChangeCallback={(val: string) => {
									if (val === "06") {
										form.setValue("taxRate", 0);
										form.setValue("taxAmount", 0);
									}
								}}
							/>
						</div>
						<div className="col-span-1">
							<FormInput
								disabled={form.watch("taxType") === "06"}
								label="Tax Rate"
								name="taxRate"
								type="number"
								inputMode="decimal"
								control={form.control}
							/>
						</div>
						<div className="col-span-1">
							<FormInput
								disabled={form.watch("taxType") === "06"}
								label="Tax Amount"
								name="taxAmount"
								type="number"
								inputMode="decimal"
								control={form.control}
							/>
						</div>
						{form.watch("taxType") === "E" && (
							<div className="col-span-3">
								<FormTextArea
									disabled={form.watch("taxType") === "06"}
									label={
										<>
											Tax Exemption Details
											<br />
											<FormDescription className="inline">
												<span className="text-destructive">* </span>
												Mandatory if tax exemption is applicable
											</FormDescription>
										</>
									}
									name="taxExemptionDetails"
									inputMode="decimal"
									description={
										"Description of tax exemption applicable.(e.g., Buyer's sales tax exemption certificate number, special exemption as per gazette orders, etc.). The input of                       special characters is not allowed, except for dash (-)."
									}
									control={form.control}
								/>
							</div>
						)} */}

						<div className="col-span-3">
							<Separator className="my-6" />
						</div>
						<div className="col-span-3">
							<FormLabel className="mt-0 text-lg font-bold">Summary</FormLabel>
						</div>
						<div className="col-span-1">
							<div className="space-y-1">
								<FormLabel>
									Subtotal
									<FormDescription className="ml-1 inline text-xs">(Readonly)</FormDescription>
								</FormLabel>
								<p>
									<span className="text-thin mr-2">MYR</span>
									{subtotal}
								</p>
							</div>
						</div>
						<div className="col-span-3 text-right">
							<Button type="submit">Save</Button>
						</div>
					</div>
				</div>
			</form>
		</Form>
	);
};

export default InvoiceItemForm;
