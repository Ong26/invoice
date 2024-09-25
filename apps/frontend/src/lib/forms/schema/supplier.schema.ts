import { Countries } from "@invoice/constants/dist/country";
import { States } from "@invoice/constants/dist/state";
import isEmail from "validator/es/lib/isEmail";
import isMobilePhone from "validator/es/lib/isMobilePhone";

import { z } from "zod";
import { requireAtLeastOneField } from "./helper";
const SupplierSchema = {
	name: z.string().min(1, { message: "Required" }),
	TIN: z
		.string()
		.min(1, { message: "Required" })
		.transform((val) => val.replaceAll(" ", "")),
	BRN: z.union([z.string().length(0, { message: "Invalid value" }), z.string().max(20, { message: "Invalid value" })]),
	myKadNo: z.union([z.string().length(0, { message: "Invalid value" }), z.string().length(12).regex(/^\d+$/, { message: "Invalid value" })]),
	armyNo: z.union([z.string().length(0, { message: "Invalid value" }), z.string().max(12).regex(/^\d+$/, { message: "Invalid value" })]),
	passportNo: z.union([z.string().length(0, { message: "Invalid value" }), z.string().length(12).regex(/^\d+$/, { message: "Invalid value" })]),
	SST: z.string().optional(),
	tourismTaxNo: z.string().optional(),
	email: z.string().refine(isEmail, { message: "Invalid email" }),
	MSICCode: z.string().min(1, { message: "Required" }),
	businessActivityDescription: z.string().min(1, { message: "Required" }),
	contactNumber: z
		.object({
			countryCode: z.string().min(1, { message: "Required" }),
			number: z.string().min(1, { message: "Required" }),
		})
		.transform(({ countryCode, number }) => {
			const transformed = {
				countryCode,
				number: number.replace(countryCode, "").replace(/^0+/, ""),
			};
			return transformed;
		})
		.refine(({ countryCode, number }) => {
			const currentPhone = countryCode + Number;
			return isMobilePhone(currentPhone, "any", {
				strictMode: true,
			});
		}),
	address: z.object({
		line1: z.string().min(1, { message: "Address Line 1 is required" }),
		line2: z.string().optional(),
		line3: z.string().optional(),
		postalZone: z.string().optional(),
		city: z.string().optional(),
		state: z.string().refine(
			(val) => {
				return States.filter((state) => state.code === val).length > 0;
			},
			{ message: "Invalid state" }
		),
		country: z.string().refine(
			(val) => {
				return Countries.filter((country) => country.code === val).length > 0;
			},
			{ message: "Invalid country" }
		),
	}),
};

export const CreateSupplierSchema = z
	.object({
		...SupplierSchema,
	})
	.superRefine(requireAtLeastOneField(["BRN", "myKadNo", "armyNo", "passportNo"]));

export const UpdateSupplierSchema = z
	.object({
		ID: z.string().min(1, { message: "Required" }),
		...SupplierSchema,
	})
	.superRefine(requireAtLeastOneField(["BRN", "myKadNo", "armyNo", "passportNo"]));
