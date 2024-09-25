import SupplierFormCard from "../components/form-card";

const Page = () => {
	return (
		<div className="w-full">
			<div className=" flex w-full flex-1 flex-col gap-x-8 pb-4 lg:flex-row">
				<SupplierFormCard />
			</div>
		</div>
	);
};

export default Page;
