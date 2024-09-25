"use client";

import ViewField from "@/components/layout/view/field";
import ViewSectionHeader from "@/components/layout/view/section-header";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Countries } from "@invoice/constants/dist/country";
import { States } from "@invoice/constants/dist/state";
import { Buyer } from "@invoice/types/dist/buyer";
import Link from "next/link";
type Props = { buyer: Buyer };

const BuyerCard = ({ buyer }: Props) => {
	const addressLines = [buyer.address.line1, buyer.address.line2, buyer.address.line3].filter((x) => !!x);
	const countryName = Countries.find((country) => country.code === buyer.address.country)?.country;
	const stateName = States.find((state) => state.code === buyer.address.state)?.state;
	return (
		<Card className="flex w-full flex-1 flex-col">
			<CardHeader>
				<div className="flex flex-row items-center justify-between">
					<CardTitle>View Buyer</CardTitle>
					<Link className={buttonVariants({ variant: "default" })} href={`/buyer/${buyer.id}/edit`}>
						Edit
					</Link>
				</div>
				<CardDescription className="font-light">#{buyer.id}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="create grid grid-cols-3 gap-x-4 gap-y-6 py-4">
					<ViewField label="Name" value={buyer.name} />
					<ViewField
						label="Email"
						value={
							<a className={(cn(buttonVariants({ variant: "link" })), "m-0 underline")} href={`mailto:${buyer.email}`}>
								{buyer.email}
							</a>
						}
						fieldClassName="col-span-2"
					/>
					<ViewField
						label="Phone"
						value={
							buyer.contactNumber ? (
								<a
									className={(cn(buttonVariants({ variant: "link" })), "m-0 underline")}
									href={`tel:${buyer.contactNumber.countryCode}${buyer.contactNumber.number}`}
								>
									{buyer.contactNumber.countryCode + " " + buyer.contactNumber.number}
								</a>
							) : (
								"-"
							)
						}
					/>
					<Separator className="col-span-3" />
					<ViewSectionHeader wrapperClassName="col-span-3" title="BRN No. / ID No. / Army No. / Passport No." />
					<ViewField label="BRN" value={buyer.BRN} />
					<ViewField label="MyKadNo" value={buyer.myKadNo} />
					<ViewField label="Army No." value={buyer.armyNo} />
					<ViewField label="PassportNo" value={buyer.passportNo} />
					<Separator className="col-span-3" />
					<ViewSectionHeader wrapperClassName="col-span-3" title="TIN" />
					<ViewField label="TIN" value={buyer.TIN} />
					<ViewField label="Validate TIN Using" value={buyer.validateTINBy} />
					<Separator className="col-span-3" />
					<ViewSectionHeader wrapperClassName="col-span-3" title="Address" />
					<ViewField
						label="Location"
						value={addressLines.map((line, index) => (
							<span key={index} className="block">
								{line}
							</span>
						))}
					/>
					<ViewField label="Postal Zone" value={buyer.address.postalZone} />
					<ViewField label="City" value={buyer.address.city} />
					<ViewField label="State" value={stateName} />
					<ViewField label="Country" value={countryName} />
				</div>
			</CardContent>
		</Card>
	);
};

export default BuyerCard;
