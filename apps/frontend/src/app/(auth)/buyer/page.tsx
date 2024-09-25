import { buttonVariants } from "@/components/ui/button";
import { BUYER_API } from "@/lib/api";
import Link from "next/link";
import BuyerTable from "./components/buyers-table";
const fetchBuyers = async () => {
	const response = await fetch(BUYER_API, { next: { tags: ["buyers"] } });
	return response.json();
};
const Page = async () => {
	const buyers = await fetchBuyers();
	return (
		<div className="w-full">
			<div className="flex w-full flex-1 flex-col gap-x-8 pb-4 gap-y-2">
				<div className="flex flex-row justify-end">
					<Link href="/buyer/create" className={buttonVariants({ variant: "default" })}>
						Create
					</Link>
				</div>
				<BuyerTable data={buyers} />
			</div>
		</div>
	);
};

export default Page;
