import UserCard from "@/components/layout/view/user-card";
import { BUYER_API } from "@/lib/api";
import BuyerCard from "./components/buyer-card";

const fetchBuyer = async (id: string) => {
	try {
		const response = await fetch(`${BUYER_API}/${id}`, { next: { tags: [`buyer_${id}`] } });
		const buyer = await response.json();
		return buyer;
	} catch (error) {
		console.log(error);
	}
};
type Props = {
	params: { id: string };
};
const Page = async ({ params: { id } }: Props) => {
	const buyer = await fetchBuyer(id);
	return (
		<div className="w-full">
			<div className="flex w-full flex-1 flex-col gap-x-8 pb-4 lg:flex-row lg:items-start gap-y-4 lg:gap-y-0">
				<BuyerCard buyer={buyer} />
				<div className="flex flex-col lg:max-w-72 gap-y-4">
					<UserCard title="Created By" actionedBy={buyer.createdBy} actionDate={buyer.createdAt} />
					<UserCard title="Updated By" actionedBy={buyer.updatedBy} actionDate={buyer.updatedAt} />
				</div>
			</div>
		</div>
	);
};

export default Page;
