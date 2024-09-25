import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LoginForm from "./components/form";

const Page = () => {
	return (
		<div className="min-h-screen min-w-screen bg-primary-foreground">
			<div className="flex flex-1 h-screen items-center justify-center">
				<Card className="min-w-96">
					<CardHeader>Login</CardHeader>
					<CardContent>
						<div className="flex flex-col space-y-4">
							<LoginForm />
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default Page;
