"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetFooter, SheetTrigger } from "@/components/ui/sheet";

import { useCallback, useState } from "react";
import BuyerForm from "./form";

const BuyerFormSheet = () => {
	const [isOpened, setIsOpened] = useState(false);

	const closeSheet = useCallback(() => {
		setIsOpened(false);
	}, []);

	return (
		<Sheet open={isOpened} onOpenChange={setIsOpened}>
			<SheetTrigger asChild>
				<Button variant="link" type="button">
					Add New
				</Button>
			</SheetTrigger>
			<SheetContent side={"bottom"} className="h-4/5 overflow-y-auto">
				<BuyerForm closeSheet={closeSheet} />
				<SheetFooter></SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export default BuyerFormSheet;
