"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SidebarItems } from "./sidebar";
import SidebarList from "./sidebar-list";
export function SidebarSheet() {
	const pathname = usePathname();
	// console.log(pathname);
	// const pathname = window?.location?.pathname;
	const [isOpen, setIsOpen] = useState(false);
	useEffect(() => {
		setIsOpen(false);
		return () => {};
	}, [pathname]);

	return (
		<Sheet open={isOpen}>
			<SheetTrigger asChild onClick={() => setIsOpen((open) => !open)}>
				<Menu />
			</SheetTrigger>
			<SheetContent side={"left"}>
				<div className="mt-4">
					<SidebarList items={SidebarItems} />
				</div>
			</SheetContent>
		</Sheet>
	);
}
