"use client";

import { cn } from "@/lib/utils";
import {
	Column,
	ColumnDef,
	Row,
	SortingState,
	Table as TTable,
	TableOptions,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { InputHTMLAttributes, useEffect, useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";

type DataTableProps<TData, TValue> = {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	wrapperClassName?: string;
} & Partial<TableOptions<TData>>;

const DataTable = <TData, TValue>({
	columns,
	data,
	wrapperClassName,
	enableColumnFilters = false,
	enableSorting = false,
}: DataTableProps<TData, TValue>) => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
	const table = useReactTable({
		data,
		columns,
		enableColumnFilters,
		enableSorting,
		state: { sorting, pagination },
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	});

	return (
		<div>
			<div className={cn("rounded-md border bg-white")}>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									const canSort = header.column.getCanSort();
									const canFilter = header.column.getCanFilter();
									const headerClassName = (header.column.columnDef.meta as any)?.headerClassName;
									return (
										<TableHead key={header.id}>
											<div className={cn("flex flex-col justify-start gap-y-2 ", { "mt-4": enableSorting || enableColumnFilters }, headerClassName)}>
												<div className="flex flex-row">
													{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
													{canSort && (
														<Button
															variant="ghost"
															onClick={() => header.column.toggleSorting(header.column.getIsSorted() === "asc")}
															className="p-0 h-fit"
														>
															<ArrowUpDown className="ml-2 h-4 w-4" />
														</Button>
													)}
												</div>
												{canFilter ? (
													<div className="mb-4">
														<Filter column={header.column} />
													</div>
												) : null}
											</div>
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<Pagination table={table} />
		</div>
	);
};
type PaginationProps<TData> = {
	table: TTable<TData>;
};
const Pagination = <TData,>({ table }: PaginationProps<TData>) => {
	const { pageIndex, pageSize } = table.getState().pagination;
	const totalCount = table.getRowCount();
	const startIndex = pageIndex * pageSize + 1;
	const possibleEndIndex = (pageIndex + 1) * pageSize;
	const endIndex = possibleEndIndex < totalCount ? possibleEndIndex : totalCount;
	if (totalCount > pageSize)
		return (
			<div className="flex items-center justify-between space-x-2 py-4">
				<div className="flex flex-row items-center gap-x-2">
					{totalCount > 0 && (
						<>
							<Label className="">Showing</Label>
							<Label className=" font-bold">{startIndex}</Label>
							<Label>-</Label>
							<Label className=" font-bold">{endIndex}</Label>
							<Label>of</Label>
							<Label className=" font-bold">{totalCount}</Label>
							<Label>results</Label>
						</>
					)}
				</div>
				<div className="flex flex-row">
					<Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
						Previous
					</Button>
					<Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
						Next
					</Button>
				</div>
			</div>
		);
	else return <></>;
};

type FilterProps = {
	column: Column<any, unknown>;
};

const Filter = ({ column }: FilterProps) => {
	const columnFilterValue = column.getFilterValue();
	const meta = column.columnDef.meta as any;
	const filterVariant = meta?.filterVariant;
	switch (filterVariant) {
		case "range":
			return (
				<div>
					<div className="flex space-x-2">
						<DebouncedInput
							type="number"
							value={(columnFilterValue as [number, number])?.[0] ?? ""}
							onChange={(value) => column.setFilterValue((old: [number, number]) => [value, old?.[1]])}
							placeholder={`Min`}
							className="w-24"
						/>
						<DebouncedInput
							type="number"
							value={(columnFilterValue as [number, number])?.[1] ?? ""}
							onChange={(value) => column.setFilterValue((old: [number, number]) => [old?.[0], value])}
							placeholder={`Max`}
							className="w-24"
						/>
					</div>
				</div>
			);

		case "select":
			const dropdownData = meta?.dropdownData as any[];

			return (
				<select
					className="bg-transparent"
					onChange={(e) => {
						const value = e.target.value;
						column.setFilterValue(value);
					}}
					value={columnFilterValue?.toString()}
				>
					<option value="">All</option>
					{dropdownData.map((value, index) => {
						return (
							<option key={value} value={value}>
								{value}
							</option>
						);
					})}
				</select>
			);
		default:
			return (
				<DebouncedInput
					onChange={(value) => column.setFilterValue(value)}
					placeholder={`Search...`}
					type="text"
					value={(columnFilterValue ?? "") as string}
				/>
			);
	}
};

type TDebouncedInput = (
	props: {
		value: string | number;
		onChange: (value: string | number) => void;
		debounce?: number;
		className?: string;
	} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">
) => JSX.Element;

const DebouncedInput: TDebouncedInput = ({ value: initialValue, onChange, className, debounce = 500, ...props }) => {
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			onChange(value);
		}, debounce);

		return () => clearTimeout(timeout);
	}, [value]);

	return <Input className={cn("h-8 py-1 px-1", className)} {...props} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export { DataTable };

export const exactNumericSelectFilter = <TData,>(row: Row<TData>, columnId: string, filterValue: any) => {
	const value = row.getValue(columnId);
	const isValueNumeric = typeof value === "number";
	if (isValueNumeric) {
		return value === +filterValue;
	}
	return value === filterValue;
};
