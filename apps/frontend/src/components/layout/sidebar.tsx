import { BadgeDollarSign, Building2, LayoutDashboard, TicketCheck } from "lucide-react";
import SidebarList from "./sidebar-list";

export const SidebarItems = [
	{
		title: "Dashboard",
		icon: <LayoutDashboard />,
		link: "/",
	},
	{
		title: "Invoice",
		icon: <TicketCheck />,
		link: "/invoice",
	},

	{
		title: "Buyer",
		icon: <BadgeDollarSign />,
		link: "/buyer",
	},
	{
		title: "Supplier Settings",
		icon: <Building2 />,
		link: "/supplier",
	},
];

const Sidebar = () => {
	return (
		<div className="relative">
			<div className="fixed min-w-52 min-h-screen hidden md:block border-r">
				<div className="flex flex-col py-4">
					<SidebarList items={SidebarItems} />
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
