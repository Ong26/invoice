import { type Address } from "./address";
import { type ContactNumber } from "./contact-number";

export type Supplier = {
	id: string;
	name: string;
	TIN: string;
	BRN: string;
	myKadNo: string;
	armyNo: string;
	passportNo: string;
	SST: string;
	tourismTaxNo: string;
	email: string;
	MSICCode: string;
	businessActivityDescription: string;
	contactNumber: ContactNumber;
	address: Address;
};
