import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../global.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Invoice",
	description: "Created by Ong",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Toaster richColors />
				<div className="relative flex flex-col min-h-screen bg-accent">
					<Header />
					<div className="container">
						<div className="flex flex-row pt-4 relative">
							<Sidebar />
							<div className="md:ml-56  mt-4 w-full relative">{children}</div>
						</div>
					</div>
				</div>
			</body>
		</html>
	);
}
