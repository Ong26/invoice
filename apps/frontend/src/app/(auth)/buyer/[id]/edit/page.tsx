import { GET_BUYER_API } from "@/lib/api";
import { EmptyBuyerForm } from "@/lib/forms/data/buyer";
import { createFormData, isValidCUID } from "@/lib/utils";
import { type Buyer } from "@invoice/types/dist/buyer";
import BuyerForm from "./components/form";
import BuyerFormCard from "./components/form-card";

async function getBuyer(id: string) {
	try {
		if (!isValidCUID(id)) return null;
		const response = await fetch(`${GET_BUYER_API}/${id}`, { next: { tags: [`buyer_${id}`] } });
		const buyer = await response.json();
		const formData = createFormData(buyer as Omit<Buyer, "id">, EmptyBuyerForm);
		return formData;
	} catch (error) {
		console.log(error);
	}
}

type Props = {
	params: { id: string };
};

const Page = async ({ params }: Props) => {
	const buyer = await getBuyer(params.id);
	// console.log(buyer);
	return (
		<div className="w-full">
			<div className=" flex w-full flex-1 flex-col gap-x-8 pb-4 lg:flex-row">
				<BuyerFormCard>
					<BuyerForm defaultValues={buyer!} />
				</BuyerFormCard>
			</div>
		</div>
	);
};

export default Page;
