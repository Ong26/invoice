"use client";

import { cn } from "@/lib/utils";
import { ShieldQuestionIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
	items: Array<{ title: string; icon: React.ReactNode; link: string }>;
};

const SidebarList = ({ items }: Props) => {
	const pathname = usePathname();
	return (
		<div className="flex flex-col md:px-2">
			{items.map((item) => {
				return (
					<Link
						key={item.title}
						href={item.link}
						className={cn("hover:bg-accent rounded px-2 py-3 flex flex-row gap-x-2 text-[0.95rem]", { "font-bold": pathname === item.link })}
					>
						{item?.icon || <ShieldQuestionIcon />}
						{item.title}
					</Link>
				);
			})}
		</div>
	);
};

export default SidebarList;
