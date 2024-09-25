import { BUYER_API } from "@/lib/api";
import { Buyer } from "@invoice/types/dist/buyer";
import PriceCard from "../components/price-card";
import InvoiceForm from "./components/invoice-form";
import InvoiceFormCard from "./components/invoice-form-card";
const fetchBuyers = async () => {
	try {
		const response = await fetch(BUYER_API);
		const buyers = await response.json();
		return buyers;
	} catch (error) {
		console.log(error);
	}
};

const Page = async () => {
	const buyers = (await fetchBuyers()) as Buyer[];
	return (
		<div className="w-full">
			<div className="relative flex flex-1 flex-col gap-x-8 pb-4 lg:flex-row lg:items-start gap-y-4 lg:gap-y-0">
				<main className="flex flex-1 flex-col pb-8">
					<InvoiceFormCard>
						<InvoiceForm buyers={buyers} />
					</InvoiceFormCard>
				</main>

				<div className="sticky top-24 flex flex-col lg:min-w-72 gap-y-4">
					<PriceCard />
				</div>
			</div>
		</div>
	);
};

export default Page;
