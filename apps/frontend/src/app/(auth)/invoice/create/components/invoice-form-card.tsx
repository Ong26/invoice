"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
	children: React.ReactNode;
};
const InvoiceFormCard = ({ children }: Props) => {
	return (
		<Card className="flex w-full flex-1 flex-col">
			<CardHeader>
				<CardTitle>Create Invoice</CardTitle>
				<CardDescription>
					<span className="text-red-500">*</span> is required field.
				</CardDescription>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
};

export default InvoiceFormCard;
