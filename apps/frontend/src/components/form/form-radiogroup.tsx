import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputProps } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormFieldProps } from "../types/form-field-props";

import { Control, FieldValues, Path } from "react-hook-form";
type FormRadioGroupProps<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	placeholder?: string;
} & InputProps &
	FormFieldProps;
export const FormRadioGroup = <T extends FieldValues>({
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
	...others
}: FormRadioGroupProps<T>) => {
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
					<FormControl>
						<RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
							<FormItem className="flex items-center space-x-3 space-y-0">
								<FormControl>
									<RadioGroupItem value="all" />
								</FormControl>
							</FormItem>
						</RadioGroup>
					</FormControl>
					{description && <FormDescription className={descriptionClassName}>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
