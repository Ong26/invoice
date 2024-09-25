"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { formatCurrencyMYR } from "@/lib/forms/schema/helper";
import { useInvoiceItemDialogStore } from "@/lib/stores/invoice-item-dialog";
import { InvoiceItem } from "@invoice/types/invoice-item";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
type InvoiceItemListProps = {
	InvoiceLineItems: InvoiceItem[];
};

const InvoiceItemList = ({ InvoiceLineItems = [] }: InvoiceItemListProps) => {
	const [invoiceItems] = useState(InvoiceLineItems);
	const { setActiveInvoiceItem, toggleDialog: toggleInvoiceItemDialog } = useInvoiceItemDialogStore();
	const onToggleViewInvoiceItemDialog = useCallback(
		(id: string) => {
			const invoiceItem = InvoiceLineItems?.find((x) => x?.id === id);
			setActiveInvoiceItem(invoiceItem);
			toggleInvoiceItemDialog();
		},
		[InvoiceLineItems, setActiveInvoiceItem, toggleInvoiceItemDialog]
	);

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
				enableColumnFilter: true,
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
					return <span className="float-right">{formatCurrencyMYR(row.getValue("subtotal"), false)}</span>;
				},
			},

			{
				accessorKey: "id",
				header: "Actions",
				id: "actions",
				cell: ({ row }) => {
					const id: string = row.getValue("id");
					const viewInvoiceItem = () => {
						onToggleViewInvoiceItemDialog(id);
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
								<DropdownMenuItem onClick={viewInvoiceItem}>View</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					);
				},
			},
		] satisfies ColumnDef<InvoiceItem>[];
	}, [onToggleViewInvoiceItemDialog]);

	return (
		<div className="mt-8 space-y-4">
			<div className="flex flex-row items-center justify-start">
				<h3>Items</h3>
			</div>
			<div className="py-6 pt-0">
				<DataTable columns={columns} data={invoiceItems} />
			</div>
		</div>
	);
};

export default InvoiceItemList;
