import { type Address } from "./address";
import { type ContactNumber } from "./contact-number";
import { User } from "./user";

export type Buyer = {
	id: string;
	name: string;
	TIN: string;
	BRN: string;
	myKadNo: string;
	armyNo: string;
	passportNo: string;
	SST: string;
	email: string;
	contactNumber: ContactNumber;
	address: Address;
	validateTINBy: string | null;
};

export type GetBuyerType = Buyer & {
	createdBy: User;
	updatedBy: User;
};
