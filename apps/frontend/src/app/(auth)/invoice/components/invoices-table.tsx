"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable, exactNumericSelectFilter } from "@/components/ui/data-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { formatCurrencyMYR } from "@/lib/forms/schema/helper";
import { Invoice } from "@invoice/types/dist/invoice";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
type Props = {
	data: Invoice[];
};

const InvoicesTable = ({ data }: Props) => {
	const columns: ColumnDef<Invoice>[] = useMemo(
		() => [
			{
				id: "select",
				header: ({ table }) => (
					<Checkbox
						checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
						onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
						aria-label="Select all"
					/>
				),
				cell: ({ row }) => (
					<Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
				),
				enableSorting: false,
				enableHiding: false,
			},
			{ accessorKey: "title", header: "Title", enableColumnFilter: true },
			{ accessorKey: "buyer.name", header: "Buyer" },
			{
				header: "Total Amount (MYR)",
				accessorKey: "total",
				meta: {
					filterVariant: "select",
					dropdownData: [...new Set(data.map((invoice) => invoice.total))],
					headerClassName: "items-end",
				},
				filterFn: exactNumericSelectFilter,
				cell: ({ row }) => {
					const total = row.getValue("total") as number;
					return <div className="text-right">{formatCurrencyMYR(total, false)}</div>;
				},
				enableSorting: false,
			},

			{
				id: "actions",
				enableHiding: false,
				cell: ({ row }) => {
					const id = row.original.id;

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
								<DropdownMenuItem>
									<Link className="w-full" href={`/invoice/${id}`}>
										View
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link prefetch className="w-full" href={`/invoice/${id}/edit`}>
										Edit
									</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					);
				},
			},
		],
		[]
	);
	return (
		<div className="w-full">
			<DataTable enableSorting enableColumnFilters columns={columns} data={data} wrapperClassName="w-full bg-white" />
		</div>
	);
};

export default InvoicesTable;
