import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { FormFieldProps } from "../types/form-field-props";

import { Calendar as CalendarIcon } from "lucide-react";

import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputProps } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Control, FieldValues, Path } from "react-hook-form";
type FormDatePickerProps<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	placeholder?: string;
} & InputProps &
	FormFieldProps;
export const FormDatePicker = <T extends FieldValues>({
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
}: FormDatePickerProps<T>) => {
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
						<Popover>
							<div className="flex flex-row gap-x-2">
								<PopoverTrigger asChild>
									<Button
										disabled={others.disabled || field.disabled}
										variant={"outline"}
										className={cn("flex flex-1 justify-start text-left font-normal", !field.value && "text-muted-foreground")}
									>
										<CalendarIcon className="mr-2 h-4 w-4" />
										{field.value ? format(field.value, "yyyy-MM-dd") : <span>Pick a date</span>}
									</Button>
								</PopoverTrigger>
								<Button className="inline-block sm:hidden lg:inline-block" variant={"link"} type="button" onClick={() => field.onChange(new Date())}>
									Today
								</Button>
							</div>

							<PopoverContent className="w-auto p-0">
								<Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
							</PopoverContent>
						</Popover>
					</FormControl>
					{description && <FormDescription className={descriptionClassName}>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default FormDatePicker;
