import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FormFieldProps } from "../types/form-field-props";

import { Control, FieldValues, Path } from "react-hook-form";
type FormSelectProps<D, T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	data: D[];
	placeholder?: string;
	labelField?: keyof D;
	valueField?: keyof D;
	itemClassName?: string;
	onChangeCallback?: (value: string) => void;
} & FormFieldProps;
export const FormSelect = <D, T extends FieldValues>({
	control,
	name,
	data,
	placeholder,
	label,
	description,
	required,
	wrapperClassName,
	labelField,
	valueField,
	itemClassName,
	descriptionClassName,
	labelClassName,
	onChangeCallback,
}: FormSelectProps<D, T>) => {
	const labelF = (labelField ?? "Label") as keyof D;
	const valueF = (valueField ?? "Value") as keyof D;
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={wrapperClassName}>
					{label && (
						<FormLabel aria-required={required} className={labelClassName}>
							{label}
						</FormLabel>
					)}
					<Select
						disabled={field.disabled}
						onValueChange={(e) => {
							field.onChange(e);
							onChangeCallback && onChangeCallback(e);
						}}
						defaultValue={field.value}
					>
						<FormControl defaultValue={field.value}>
							<SelectTrigger className={cn("mt-2", wrapperClassName)}>
								<SelectValue defaultValue={field.value} placeholder={placeholder} />
							</SelectTrigger>
						</FormControl>

						<SelectContent>
							{data.map((item: D) => {
								return (
									<SelectItem value={item[valueF] as string} key={item[valueF] as string} className={itemClassName}>
										{item[labelF] as string}
									</SelectItem>
								);
							})}
						</SelectContent>
					</Select>
					{description && <FormDescription className={descriptionClassName}>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
