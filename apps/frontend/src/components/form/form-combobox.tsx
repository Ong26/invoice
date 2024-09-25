"use client";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { FormFieldProps } from "../types/form-field-props";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
type FormComboboxProps<D, X extends keyof D & string, T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	data: D[];
	placeholder?: string;
	labelField: X;
	valueField: X;
	keyField?: X;
	buttonField?: X;
	buttonClassName?: string;
	popoverClassName?: string;
	itemClassName?: string;
	onChangeCallback?: (value: string) => void;
} & FormFieldProps;
export const FormCombobox = <D, X extends keyof D & string, T extends FieldValues>({
	control,
	name,
	data,
	placeholder = "Select One",
	label,
	description,
	required,
	labelField,
	valueField,
	buttonField = labelField,
	keyField = valueField,
	onChangeCallback,
	...others
}: FormComboboxProps<D, X, T>) => {
	const [open, setOpen] = useState(false);
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => {
				const shownWord = field.value ? data.find((item) => item[valueField] === field.value)?.[buttonField] : placeholder;
				return (
					<FormItem className={others?.wrapperClassName}>
						{label && (
							<FormLabel aria-required={required} className={others?.labelClassName}>
								{label}
							</FormLabel>
						)}
						<FormControl>
							<Popover open={open} onOpenChange={setOpen}>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										role="combobox"
										disabled={others?.disabled || field.disabled}
										aria-expanded={open}
										className={cn("w-full justify-between truncate", others?.buttonClassName)}
									>
										<span className="max-w-[90%] truncate">{shownWord as string}</span>
										<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
									</Button>
								</PopoverTrigger>
								<PopoverContent className={cn("w-[300px] p-0", others?.popoverClassName)}>
									<Command
										filter={(value, search) => {
											//can implement fuzzy search in future
											const item = data.find((x) => x[valueField] === value);
											if (!item) return 0;
											if ((item[labelField] as string).toLowerCase().includes(search.toLowerCase())) return 1;

											return 0;
										}}
									>
										<CommandInput placeholder="Search..." />
										<CommandList>
											<CommandEmpty>No item found.</CommandEmpty>
											<CommandGroup>
												{data.map((item, i) => {
													return (
														<CommandItem
															key={item[keyField] as string}
															value={item[valueField] as string}
															onSelect={(value) => {
																onChangeCallback && onChangeCallback(value);
																field.onChange(value);
																setOpen(false);
															}}
														>
															<Check className={cn("mr-2 h-4 w-4", field?.value === item[valueField] ? "opacity-100" : "opacity-0")} />
															{item[labelField] as string}
														</CommandItem>
													);
												})}
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>
						</FormControl>
						{description && <FormDescription className={others?.descriptionClassName}>{description}</FormDescription>}
						<FormMessage />
					</FormItem>
				);
			}}
		/>
	);
};

export default FormCombobox;
