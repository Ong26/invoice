"use client";
import { CreateSupplierSchema } from "@/lib/forms/schema/supplier.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Countries } from "@invoice/constants/dist/country";
import { MSICSWithoutReference } from "@invoice/constants/dist/msic";
import { States } from "@invoice/constants/dist/state";
import { Supplier } from "@invoice/types/supplier";
// import { Button, Form, FormCombobox, FormDescription, FormInput, FormLabel, FormTextArea, Separator } from "@/components";
import { FormCombobox } from "@/components/form/form-combobox";
import { FormInput } from "@/components/form/form-input";
import { FormTextArea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { Form, FormDescription, FormLabel } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { DefaultSupplierForm } from "@/lib/forms/data/supplier";
import { CountryCodeWithCallingCode } from "@invoice/constants/dist/country-code";
import { useForm } from "react-hook-form";
type Props = { defaultValues?: Partial<Supplier> };

const SupplierForm = ({ defaultValues }: Props) => {
	const submitForm = (values: Supplier) => {
		console.log(values);
	};

	const form = useForm<Supplier>({
		resolver: zodResolver(CreateSupplierSchema),
		defaultValues: DefaultSupplierForm as Supplier,
	});
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(submitForm)} className="">
				<div className="create grid grid-cols-3 gap-4">
					<h3 className="col-span-3 mb-4">Edit My Company</h3>
					<div className="col-span-3 flex flex-col md:col-span-1">
						<FormInput label="Name" name="name" required control={form.control} wrapperClassName="space-y-1" inputClassName="mt-1" />
					</div>
					<div className="col-span-3 flex flex-col md:col-span-1">
						<FormInput label="Email" name="email" required control={form.control} wrapperClassName="space-y-1" inputClassName="mt-1" />
					</div>
					<div className="col-span-3 flex flex-col md:col-span-2">
						<FormLabel>Contact Number</FormLabel>
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
							<FormInput name="contactNumber.number" control={form.control} wrapperClassName="w-full" />
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
							label="Business Registration No"
							name="BRN"
							description="For businesses: Business registration number"
							control={form.control}
							wrapperClassName="space-y-1"
						/>
					</div>
					<div className="col-span-3 flex flex-col md:col-span-1">
						<FormInput
							label="MyKad No"
							name="myKadNo"
							control={form.control}
							wrapperClassName="space-y-1"
							description="For Malaysian individual: MyKad / MyTentera identification number (Without &ldquo;-&rdquo;)"
						/>
					</div>
					<div className="col-span-3 flex flex-col md:col-span-1">
						<FormInput label="Army No" name="armyNo" control={form.control} inputClassName="mt-1" />
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
							label="TIN"
							name="TIN"
							description="Supplier’s TIN assigned by IRBM"
							required
							control={form.control}
							wrapperClassName="space-y-1"
						/>
					</div>
					<div className="col-span-3 flex flex-col md:col-span-2">
						<div className="space-y-1">
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
						</div>
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
								<FormInput control={form.control} name="address.line1" placeholder="Address Line 1*" />
							</div>
							<div className="col-span-3">
								<FormInput control={form.control} name="address.line2" placeholder="Address Line 2" />
							</div>
							<div className="col-span-3">
								<FormInput control={form.control} name="address.line3" placeholder="Address Line 3" />
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

					<div className="col-span-3 flex flex-col md:col-span-1">
						<FormCombobox
							control={form.control}
							label="MSIC Code"
							name="MSICCode"
							description="5-digit numeric code that represent the Supplier’s business nature and activity"
							required
							data={MSICSWithoutReference}
							labelField="description"
							valueField="code"
						/>
					</div>
					<div className="col-span-3 flex flex-col md:col-span-1">
						<FormInput
							control={form.control}
							name="SST"
							label="SST Registration No."
							description="The input of special characters is not allowed, except for dash (-). Supplier to input &ldquo;NA&rdquo; if supplier is not registered for SST."
							wrapperClassName="space-y-1"
						/>
					</div>
					<div className="col-span-3 flex flex-col md:col-span-1">
						<FormInput
							control={form.control}
							name="tourismTaxNo"
							label="Tourism Tax No."
							description="The input of special characters is not allowed, except for dash (-). Supplier to input &ldquo;NA&rdquo; if supplier is not registered for tourism tax."
							wrapperClassName="space-y-1"
						/>
					</div>

					<div className="col-span-3 flex flex-col">
						<FormTextArea control={form.control} required rows={5} name="businessActivityDescription" label="Business Activity Description No." />
					</div>
					<div className="col-span-3">
						<Button type="submit">Submit</Button>
					</div>
				</div>
			</form>
		</Form>
	);
};

export default SupplierForm;
