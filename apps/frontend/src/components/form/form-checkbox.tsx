import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormFieldProps } from "../types/form-field-props";

import { cn } from "@/lib/utils";
import { Control, FieldValues, Path } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
type FormCheckboxProps<D, X extends keyof D & string, T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	data: D[];
	labelField: X;
	valueField: X;
	keyField?: X;
	multiple?: boolean;
	placeholder?: string;
	checkboxGroupClassname?: string;
	onChangeCallback?: (value: string) => void;
} & FormFieldProps;
export const FormCheckbox = <D, X extends keyof D & string, T extends FieldValues>({
	control,
	name,
	data,
	labelField,
	valueField,
	placeholder,
	label,
	description,
	required,
	wrapperClassName,
	inputClassName,
	descriptionClassName,
	checkboxGroupClassname,
	labelClassName,
	multiple = false,
	onChangeCallback,
	...others
}: FormCheckboxProps<D, X, T>) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => {
				return (
					<FormItem className={wrapperClassName}>
						{label && (
							<FormLabel aria-required={required} className={labelClassName}>
								{label}
							</FormLabel>
						)}
						<div className={cn("", checkboxGroupClassname)}>
							{data.map((item) => (
								<FormField
									key={item[valueField] as string}
									control={control}
									name={name}
									render={({ field }) => {
										return (
											<FormItem key={item[valueField] as string} className="flex flex-row items-start gap-x-1 space-y-0">
												<FormControl>
													<Checkbox
														checked={multiple ? field.value?.includes(item[valueField]) : field.value === item[valueField]}
														onCheckedChange={(checked) => {
															if (multiple)
																return checked
																	? field.onChange([...field.value, item[valueField]])
																	: field.onChange(field.value?.filter((value: string) => value !== (item[valueField] as string)));
															else return checked ? field.onChange(item[valueField]) : field.onChange("");
														}}
													/>
												</FormControl>
												<FormLabel className="font-normal">{item[labelField] as string}</FormLabel>
											</FormItem>
										);
									}}
								/>
							))}
						</div>
						{description && <FormDescription className={descriptionClassName}>{description}</FormDescription>}
						<FormMessage />
					</FormItem>
				);
			}}
		/>
	);
};
