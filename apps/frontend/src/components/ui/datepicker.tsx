"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export function DatePicker() {
	const [date, setDate] = React.useState<Date>();
	const setToday = () => {
		setDate(new Date());
	};
	return (
		<Popover>
			<div className="flex flex-row gap-x-2">
				<PopoverTrigger asChild>
					<Button variant={"outline"} className={cn("flex flex-1 justify-start text-left font-normal", !date && "text-muted-foreground")}>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{date ? format(date, "yyyy-MM-dd") : <span>Pick a date</span>}
					</Button>
				</PopoverTrigger>
				<Button variant={"link"} type="button" onClick={setToday}>
					Today
				</Button>
			</div>

			<PopoverContent className="w-auto p-0">
				<Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
			</PopoverContent>
		</Popover>
	);
}
