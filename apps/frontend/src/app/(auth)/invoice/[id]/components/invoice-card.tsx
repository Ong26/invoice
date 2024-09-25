import ViewField from "@/components/layout/view/field";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Invoice } from "@invoice/types/dist/invoice";
import Link from "next/link";
import { InvoiceItemDialog } from "./invoice-item-dialog";
import InvoiceItemList from "./invoice-item-list";

type Props = { invoice: Invoice };

const InvoiceCard = ({ invoice }: Props) => {
	return (
		<>
			<InvoiceItemDialog />

			<Card className="flex w-full flex-1 flex-col">
				<CardHeader>
					<div className="flex flex-row items-center justify-between">
						<CardTitle>View Invoice</CardTitle>
						<Link className={buttonVariants({ variant: "default" })} href={`/invoice/${invoice.id}/edit`}>
							Edit
						</Link>
					</div>
					<CardDescription className="font-light">#{invoice.id}</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-3 gap-x-2 gap-y-4 py-6">
						<ViewField fieldClassName="md:col-span-3" label="Title / Description" value={invoice.title} />
						<ViewField fieldClassName="md:col-span-3" label="Items" value={<InvoiceItemList InvoiceLineItems={invoice.items} />} />
					</div>
				</CardContent>
			</Card>
		</>
	);
};

export default InvoiceCard;
