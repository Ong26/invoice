import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FormFieldProps } from "../types/form-field-props";

import { Control, FieldValues, Path } from "react-hook-form";
type FormInputProps<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	placeholder?: string;
	numeric?: boolean;
	onChangeCallback?: (value: string) => void;
} & InputProps &
	FormFieldProps;
export const FormInput = <T extends FieldValues>({
	control,
	name,
	placeholder,
	label,
	description,
	required,
	wrapperClassName,
	inputClassName,
	descriptionClassName,
	labelClassName,
	numeric,
	onChangeCallback,
	...others
}: FormInputProps<T>) => {
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
						<FormControl>
							<Input
								{...others}
								{...field}
								onBlur={(e) => {
									if (others.type === "number") {
										const value = e.target.value;
										if (value.startsWith(".")) {
											field.onChange("0" + value);
											return;
										}
										field.onChange(value.replace(/^0+(?=\d)/, ""));
									}
								}}
								onChange={(e) => {
									let value = e.target.value;
									if (numeric) value = value.replace(/[^0-9]/g, "");
									field.onChange(value);
									onChangeCallback && onChangeCallback?.(e.target.value);
								}}
								placeholder={placeholder}
								className={cn(inputClassName)}
							/>
						</FormControl>
						{description && <FormDescription className={cn("text-balance", descriptionClassName)}>{description}</FormDescription>}
						<FormMessage />
					</FormItem>
				);
			}}
		/>
	);
};
