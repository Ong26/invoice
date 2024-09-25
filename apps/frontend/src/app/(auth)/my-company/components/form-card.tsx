"use client";
import { Card, CardContent } from "@/components/ui/card";
import SupplierForm from "./form";

const SupplierFormCard = () => {
	return (
		<Card className="flex w-full flex-1 flex-col">
			<CardContent className="p-6">
				<SupplierForm />
			</CardContent>
		</Card>
	);
};

export default SupplierFormCard;
