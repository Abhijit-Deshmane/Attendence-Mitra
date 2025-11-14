"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { CalendarSearchIcon } from "lucide-react";
import { addMonths } from "date-fns";
import moment from "moment";
import { Calendar } from "@/components/ui/calendar";

const MonthSelection = ({selctedMonth}) => {
  const today = new Date();
  const nextMonths = addMonths(new Date(), 0);
  const [month, setMonth] = useState(nextMonths);

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <Button
            variant={"outline"}
            className={"flex gap-2 items-center text-slate-500"}
          >
            <CalendarSearchIcon className="h-5 w-5" />
            {moment(month).format("MMM yyyy")}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            month={month}
            onMonthChange ={(value) => {
                selctedMonth(value);
                setMonth(value)}}
            className="flex flex-1 justify-center"     
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MonthSelection;
