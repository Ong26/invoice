"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
	children: React.ReactNode;
};
const BuyerFormCard = ({ children }: Props) => {
	return (
		<Card className="flex w-full flex-1 flex-col">
			<CardHeader>
				<CardTitle>Edit Buyer</CardTitle>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
};

export default BuyerFormCard;
