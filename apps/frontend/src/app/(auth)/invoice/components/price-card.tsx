"use client";

import ViewField from "@/components/layout/view/field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrencyMYR } from "@/lib/forms/schema/helper";
import { Invoice } from "@invoice/types/dist/invoice";
import { useEffect } from "react";
import { useTotalPriceStore } from "../stores/use-price-total";

type Props = {
	invoice?: Invoice | null;
};

const PriceCard = ({ invoice }: Props) => {
	const { totalPrice, setTotalPrice } = useTotalPriceStore();
	useEffect(() => {
		if (invoice) {
			const totalPrice = invoice.items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
			setTotalPrice(totalPrice);
		}
	}, [invoice, setTotalPrice]);
	return (
		<Card className="flex w-full flex-1 flex-col">
			<CardHeader>
				<CardTitle className="text-lg">Total</CardTitle>
			</CardHeader>

			<CardContent>
				<div className="grid grid-cols-3 lg:grid-cols-1 gap-x-4 gap-y-2 lg:gap-y-4">
					<ViewField
						value={
							<>
								<span>{formatCurrencyMYR(totalPrice)}</span>
							</>
						}
					/>
				</div>
			</CardContent>
		</Card>
	);
};

export default PriceCard;
