"use client";
import { FormCheckbox } from "@/components/form/form-checkbox";
import FormCombobox from "@/components/form/form-combobox";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { Form, FormDescription, FormLabel } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { UPDATE_BUYER_API } from "@/lib/api";
import { handlePostError, patch } from "@/lib/api/fetch";
import { CreateBuyerSchema } from "@/lib/forms/schema/buyer.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Countries } from "@invoice/constants/dist/country";
import { CountryCodeWithCallingCode } from "@invoice/constants/dist/country-code";
import { States } from "@invoice/constants/dist/state";
import { type Buyer } from "@invoice/types/buyer";
import { revalidateTag } from "next/cache";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
type Props = {
	defaultValues?: Partial<Buyer>;
	closeSheet?: () => void;
};
const BuyerForm = ({ defaultValues, closeSheet }: Props) => {
	const form = useForm<Buyer>({
		resolver: zodResolver(CreateBuyerSchema),
		defaultValues: defaultValues as Buyer,
	});
	const router = useRouter();
	const submitForm = async (values: Buyer) => {
		try {
			const res = await patch(`${UPDATE_BUYER_API}/${defaultValues?.id}`, values);
			if (res?.id) {
				toast("Success!", {
					description: "Buyer is updated",
					action: { label: "View", onClick: () => router.replace(`/buyer/${res.id}`) },
				});
				revalidateTag(`buyer_${res.id}`);
				revalidateTag("buyers");
				return;
			}
			handlePostError(res, form);
		} catch (error) {
			console.log(error);
		}

		closeSheet && closeSheet();
	};
	console.log(form.formState.errors);
	return (
		<Form {...form}>
			<form id="buyer-form" onSubmit={form.handleSubmit(submitForm)} className="">
				<div className="create grid grid-cols-3 gap-4 py-4">
					<div className="col-span-3 flex flex-col md:col-span-1">
						<FormInput
							autoComplete="name"
							label="Name"
							name="name"
							required
							control={form.control}
							wrapperClassName="space-y-1"
							inputClassName="mt-1"
						/>
					</div>
					<div className="col-span-3 flex flex-col md:col-span-1">
						<FormInput
							autoComplete="email"
							label="Email"
							name="email"
							required
							control={form.control}
							wrapperClassName="space-y-1"
							inputClassName="mt-1"
						/>
					</div>
					<div className="col-span-3 flex flex-col md:col-span-2">
						<FormLabel aria-required>Contact Number</FormLabel>
						<div className="mt-2 flex flex-1 flex-row gap-x-2">
							<FormCombobox
								control={form.control}
								name="contactNumber.countryCode"
								data={CountryCodeWithCallingCode}
								labelField={"country"}
								buttonField={"callingCode"}
								keyField={"countryCallingCode"}
								valueField={"callingCode"}
								buttonClassName="w-[100px]"
							/>
							<FormInput name="contactNumber.number" control={form.control} inputMode="numeric" wrapperClassName="w-full" />
						</div>
					</div>

					<div className="col-span-3">
						<Separator className="my-6" />
					</div>
					<div className="col-span-3">
						<div className="flex flex-col">
							<FormLabel className="mt-0 text-lg font-bold">BRN No. / ID No. / Army No. / Passport No.</FormLabel>
							<FormDescription> At least one is required</FormDescription>
						</div>
					</div>
					<div className="col-span-3 flex flex-col md:col-span-1">
						<FormInput
							label="BRN"
							name="BRN"
							description="For businesses: Business registration number"
							control={form.control}
							wrapperClassName="space-y-1"
						/>
					</div>
					<div className="col-span-3 flex flex-col md:col-span-1">
						<FormInput
							numeric
							inputMode="numeric"
							maxLength={12}
							label="MyKad No"
							name="myKadNo"
							control={form.control}
							wrapperClassName="space-y-1"
							description="For Malaysian individual: MyKad Number (Without &ldquo;-&rdquo;)"
						/>
					</div>
					<div className="col-span-3 flex flex-col md:col-span-1">
						<FormInput
							label="Army No"
							name="armyNo"
							control={form.control}
							wrapperClassName="space-y-1"
							description="For Malaysian individual: MyTentera identification number (Without &ldquo;-&rdquo;)"
						/>
					</div>
					<div className="col-span-3 flex flex-col md:col-span-1">
						<FormInput
							label="Passport No"
							name="passportNo"
							control={form.control}
							wrapperClassName="space-y-1"
							description="For non-Malaysian individual: Passport number / MyPR / MyKAS identification number (Without &ldquo;-&rdquo;)"
						/>
					</div>
					<div className="col-span-3">
						<Separator className="my-6" />
					</div>
					<div className="col-span-3">
						<div className="flex flex-col">
							<FormLabel className="mt-0 text-lg font-bold">TIN No.</FormLabel>
						</div>
					</div>
					<div className="col-span-3 flex flex-col md:col-span-1">
						<FormInput
							label="Tax Identification Number"
							name="TIN"
							description="Buyer’s TIN assigned by IRBM"
							required
							control={form.control}
							wrapperClassName="space-y-1"
						/>
					</div>
					<div className="col-span-3 flex flex-col md:col-span-2">
						<FormCheckbox
							control={form.control}
							data={[
								{ label: "BRN", value: "BRN" },
								{ label: "MyKad No", value: "MYKAD" },
								{ label: "Army No", value: "ARMYNO" },
								{ label: "Passport No", value: "PASSPORT" },
							]}
							labelField={"label"}
							valueField={"value"}
							name="validateTINBy"
							checkboxGroupClassname="flex flex-col md:flex-row gap-y-2 md:gap-x-4 md:gap-y-0"
							label="Validate TIN By"
						/>
						{/* <div className="space-y-1">
							<FormLabel>Validate TIN by</FormLabel>

							<div className="flex flex-row gap-x-2">
								<Button type="button" variant={"outline"} className="my-0">
									BRN
								</Button>
								<Button type="button" variant={"outline"} className="my-0">
									MyKad
								</Button>
								<Button type="button" variant={"outline"} className="my-0">
									Army No.
								</Button>
								<Button type="button" variant={"outline"} className="my-0">
									Passport No
								</Button>
							</div>
							<FormDescription>Optional: You can validate your TIN manually</FormDescription>
						</div> */}
					</div>
					<div className="col-span-3">
						<Separator className="my-6" />
					</div>
					<div className="col-span-3">
						<FormLabel className="mt-0 text-lg font-bold">Address</FormLabel>
					</div>

					<div className="col-span-3 md:col-span-2">
						<div className="grid grid-cols-3 gap-x-2 gap-y-2">
							<div className="col-span-3">
								<FormInput control={form.control} name="address.line1" placeholder="Line 1*" />
							</div>
							<div className="col-span-3">
								<FormInput control={form.control} name="address.line2" placeholder="Line 2" />
							</div>
							<div className="col-span-3">
								<FormInput control={form.control} name="address.line3" placeholder="Line 3" />
							</div>
							<div className="col-span-1">
								<FormInput control={form.control} name="address.postalZone" placeholder="Postal Zone" />
							</div>

							<div className="col-span-2">
								<FormInput control={form.control} name="address.city" placeholder="City*" />
							</div>
							<div className="col-span-1">
								<FormCombobox control={form.control} name="address.state" data={States} labelField={"state"} valueField="code" />
							</div>
							<div className="col-span-2">
								<FormCombobox control={form.control} name="address.country" data={Countries} labelField="country" valueField="code" />
							</div>
						</div>
					</div>
					<div className="col-span-3">
						<Separator className="my-6" />
					</div>

					<div className="col-span-3">
						<FormLabel className="mt-0 text-lg font-bold">Additional Info</FormLabel>
					</div>

					<div className="col-span-3 flex flex-col md:col-span-2 lg:col-span-1">
						<FormInput
							control={form.control}
							name="SST"
							label="SST Registration No."
							description="The input of special characters is not allowed, except for dash (-). Buyer to input &ldquo;NA&rdquo; if buyer is not registered for SST."
							wrapperClassName="space-y-1"
						/>
					</div>

					<div className="col-span-3">
						<Button type="submit" form="buyer-form">
							Save
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
};

export default BuyerForm;
