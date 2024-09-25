"use client";
import { usePathName } from "@/lib/hooks/use-pathname";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import BuyerForm from "./form";

const BuyerFormCard = () => {
	const { mode } = usePathName();
	return (
		<Card className="flex w-full flex-1 flex-col">
			<CardHeader>
				<CardTitle>{mode} Buyer</CardTitle>
			</CardHeader>
			<CardContent>
				<BuyerForm />
			</CardContent>
		</Card>
	);
};

export default BuyerFormCard;
