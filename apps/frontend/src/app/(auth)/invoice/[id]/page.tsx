import UserCard from "@/components/layout/view/user-card";
import { BUYER_API, INVOICE_API } from "@/lib/api";
import PriceCard from "../components/price-card";
import InvoiceCard from "./components/invoice-card";

const fetchBuyers = async () => {
	try {
		const response = await fetch(BUYER_API, { next: { tags: ["buyers"] } });
		return response.json();
	} catch (error) {
		console.log(error);
	}
};

const fetchInvoice = async (id: string) => {
	try {
		const response = await fetch(`${INVOICE_API}/${id}`, {
			next: { tags: [`invoice_${id}`] },
		});
		return response.json();
	} catch (error) {
		console.log(error);
	}
};

type PageProps = { params: { id: string } };

const Page = async ({ params: { id } }: PageProps) => {
	const invoice = await fetchInvoice(id);
	return (
		<div className="w-full">
			<div className="flex w-full flex-1 flex-col gap-x-8 pb-4 lg:flex-row lg:items-start gap-y-4 lg:gap-y-0">
				<main className="flex w-full flex-1 flex-col pb-8">
					<InvoiceCard invoice={invoice} />
				</main>

				<div className="sticky top-24 flex flex-col lg:w-72 gap-y-4">
					<PriceCard invoice={invoice} />
					<UserCard title="Created By" actionedBy={invoice.createdBy} actionDate={invoice.createdAt} />
					<UserCard title="Updated By" actionedBy={invoice.updatedBy} actionDate={invoice.updatedAt} />
				</div>
			</div>
		</div>
	);
};

export default Page;
