import { buttonVariants } from "@/components/ui/button";
import { INVOICE_API } from "@/lib/api";
import Link from "next/link";
import InvoicesTable from "./components/invoices-table";
const fetchInvoices = async () => {
	const response = await fetch(INVOICE_API, { next: { tags: ["invoices"] } });
	return await response.json();
};
const Page = async () => {
	const invoices = await fetchInvoices();
	return (
		<div className="w-full">
			<div className="flex w-full flex-1 flex-col gap-x-8 pb-4 gap-y-2">
				<div className="flex flex-row justify-end">
					<Link href="/invoice/create" className={buttonVariants({ variant: "default" })}>
						Create
					</Link>
				</div>
				<InvoicesTable data={invoices} />
			</div>
		</div>
	);
};

export default Page;
