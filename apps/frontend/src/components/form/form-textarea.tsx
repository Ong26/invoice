import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea, TextareaProps } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { FormFieldProps } from "../types/form-field-props";

import { Control, FieldValues, Path } from "react-hook-form";
type FormTextAreaProps<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	className?: string;
} & TextareaProps &
	FormFieldProps;
export const FormTextArea = <T extends FieldValues>({
	control,
	name,
	label,
	description,
	required,
	wrapperClassName,
	inputClassName,
	descriptionClassName,
	labelClassName,
	...others
}: FormTextAreaProps<T>) => {
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
							<Textarea {...others} {...field} className={cn(inputClassName)} onChange={field.onChange} value={field.value} />
						</FormControl>
						{description && <FormDescription className={descriptionClassName}>{description}</FormDescription>}
						<FormMessage />
					</FormItem>
				);
			}}
		/>
	);
};
