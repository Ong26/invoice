import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const ViewSectionHeader = ({ title, wrapperClassName }: { title: ReactNode; wrapperClassName?: string }) => {
	return (
		<div className={cn("flex flex-row items-center justify-between", wrapperClassName)}>
			<p className="mt-0 text-lg font-bold">{title}</p>
		</div>
	);
};

export default ViewSectionHeader;
