"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePathName } from "@/lib/hooks/use-pathname";
import SupplierForm from "./form";

const SupplierFormCard = () => {
	const { mode } = usePathName();
	return (
		<Card className="flex w-full flex-1 flex-col">
			<CardHeader>
				<CardTitle>{mode} Supplier</CardTitle>
			</CardHeader>
			<CardContent>
				<SupplierForm />
			</CardContent>
		</Card>
	);
};

export default SupplierFormCard;
