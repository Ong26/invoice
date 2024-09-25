import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, User } from "lucide-react";
import Link from "next/link";
import { SidebarSheet } from "./sidebar-sheet";

type Props = {};

const Header = (props: Props) => {
	return (
		<div className="bg-white sticky top-0 shadow-md z-10 h-18">
			<div className="container">
				<div className="flex justify-between items-center p-4">
					<div className="flex items-center gap-x-4">
						<Link className="text-2xl font-bold" href="/">
							Invoice
						</Link>
						<div className="inline-flex md:hidden">
							<SidebarSheet />
						</div>
					</div>
					<div className="flex">
						<ProfileDropDown />
					</div>
				</div>
			</div>
		</div>
	);
};

const ProfileDropDown = () => {
	return (
		<div className="flex flex-row space-x-4">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div className="flex flex-row items-center gap-x-3 cursor-pointer">
						<Avatar>
							{/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
							<AvatarFallback className="bg-accent text-primary">CE</AvatarFallback>
						</Avatar>
						<ChevronDown size={14} strokeWidth={1} />
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="min-w-48">
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuGroup>
						<DropdownMenuItem>
							<User className="mr-2 h-4 w-4" />
							<span>Profile</span>
						</DropdownMenuItem>

						<Button variant={"destructive"} className="ml-2 mt-2">
							Logout
						</Button>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};
export default Header;
