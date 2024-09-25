"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { INVOICE_ITEM_API } from "@/lib/api";
import { deleteReq } from "@/lib/api/fetch";
import { formatCurrencyMYR } from "@/lib/forms/schema/helper";
import { useInvoiceItemDialogStore } from "@/lib/stores/invoice-item-dialog";
import { InvoiceItem } from "@invoice/types/invoice-item";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { toast } from "sonner";
import { AddInvoiceButton } from "./invoice-item-dialog";
type InvoiceItemListProps = {
	invoiceItems: InvoiceItem[];
	setInvoiceItems: Dispatch<SetStateAction<InvoiceItem[]>>;
};

const InvoiceItemList = ({ invoiceItems = [], setInvoiceItems }: InvoiceItemListProps) => {
	const { setActiveInvoiceItem, toggleDialog: toggleInvoiceItemDialog } = useInvoiceItemDialogStore();
	const onToggleUpdateInvoiceItemDialog = useCallback(
		(id: string) => {
			const invoiceItem = invoiceItems?.find((x) => x?.id === id);
			setActiveInvoiceItem(invoiceItem);
			toggleInvoiceItemDialog();
		},
		[invoiceItems, setActiveInvoiceItem, toggleInvoiceItemDialog]
	);

	const deleteInvoiceItem = async (id?: string) => {
		try {
			const res = await deleteReq(`${INVOICE_ITEM_API}/${id}`);
			if (res.id) {
				setInvoiceItems((value) => value.filter((x) => x.id !== id));
				toast("Item deleted successfully");
			} else {
				toast.error("Fail to delete item", { description: res.message });
			}
		} catch (error) {
			console.log(error);
			toast.error("Fail to delete item");
		}
	};

	const columns = useMemo(() => {
		return [
			{
				accessorKey: "id",
				header: "#",
				enableSorting: false,
				size: 20,
				cell: ({ row }) => {
					return <span>{row.index + 1}</span>;
				},
			},
			{ accessorKey: "description", header: "Description" },
			{
				accessorKey: "unitPrice",
				header: () => <span className="flex flex-1 justify-end">Unit Price</span>,
				cell: ({ row }) => {
					return <span className="flex flex-1 justify-end">{formatCurrencyMYR(row.getValue("unitPrice"), false)}</span>;
				},
			},
			{
				accessorKey: "quantity",
				header: () => <span className="flex flex-1 justify-end">Quantity</span>,
				cell: ({ row }) => {
					return <span className="flex flex-1 justify-end">{row.getValue("quantity")}</span>;
				},
			},
			{
				accessorKey: "subtotal",
				header: () => <span className="float-right">Subtotal</span>,
				cell: ({ row }) => {
					return (
						<span className="float-right">
							{formatCurrencyMYR((row.getValue("quantity") as number) * (row.getValue("unitPrice") as number), false)}
						</span>
					);
				},
			},

			{
				accessorKey: "id",
				header: "Actions",
				id: "actions",
				cell: ({ row }) => {
					const id: string = row.getValue("id");
					const editInvoiceItem = () => {
						onToggleUpdateInvoiceItemDialog(id);
					};

					const deleteItem = () => {
						const ans = confirm("Are you sure you want to delete this item?");
						if (ans) deleteInvoiceItem(id);
					};
					return (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="h-8 w-8 p-0">
									<span className="sr-only">Open menu</span>
									<MoreHorizontal className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Actions</DropdownMenuLabel>
								<DropdownMenuItem onClick={editInvoiceItem}>Edit</DropdownMenuItem>
								<DropdownMenuItem onClick={deleteItem}>Delete</DropdownMenuItem>
								<DropdownMenuSeparator />
							</DropdownMenuContent>
						</DropdownMenu>
					);
				},
			},
		] satisfies ColumnDef<InvoiceItem>[];
	}, [onToggleUpdateInvoiceItemDialog]);

	return (
		<div className="mt-8 space-y-4">
			<div className="flex flex-row items-center justify-start">
				<h3>Items</h3>
				<AddInvoiceButton />
			</div>
			<div className="py-6 pt-0">
				<DataTable columns={columns} data={invoiceItems} />
			</div>
		</div>
	);
};

export default InvoiceItemList;
