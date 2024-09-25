"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@invoice/types/user";
import { format } from "date-fns/format";
import ViewField from "./field";

type Props = {
	title: string;
	actionedBy: User;
	actionDate: Date;
};

const UserCard = ({ title, actionedBy, actionDate }: Props) => {
	if (actionedBy)
		return (
			<Card className="flex w-full flex-1 flex-col">
				<CardHeader>
					<CardTitle className="text-lg">{title}</CardTitle>
				</CardHeader>

				<CardContent>
					<div className="grid grid-cols-3 lg:grid-cols-1 gap-x-4 gap-y-2 lg:gap-y-4">
						<ViewField label="Name" value={actionedBy.firstName} />
						<ViewField label="Email" value={actionedBy.email} />
						<ViewField label="Date & Time" value={format(actionDate, "EE, dd/MM/yyyy hh:mma")} />
					</div>
				</CardContent>
			</Card>
		);
	else return <></>;
};

export default UserCard;
