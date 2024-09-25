import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type ViewFieldProps = {
	label?: ReactNode;
	value?: ReactNode;
	fieldClassName?: string;
};
const ViewField = ({ label, value, fieldClassName }: ViewFieldProps) => {
	return (
		<div className={cn("flex flex-col col-span-3 md:col-span-1 gap-y-2", fieldClassName)}>
			{label && <label className="text-sm text-gray-500 font-medium leading-none">{label}</label>}
			<label className="text-sm font-medium">{value || "-"}</label>
		</div>
	);
};

export default ViewField;
