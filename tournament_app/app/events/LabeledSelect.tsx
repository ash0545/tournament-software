import React from "react";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "../../components/ui/select";
import { FormControl, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps } from "react-hook-form";

interface LabeledSelectProps {
  label: string;
  selectPlaceholder: string;
  selectItems: [string, string][]; // [value, item name] pairs for SelectItem component
  field: ControllerRenderProps<
    {
      name: string;
      age_restriction: number;
      entry_fee: number;
      max_entries: number;
      seeding_count: number;
      type_code: "single" | "double" | "team_event";
      format_code: "round_robin" | "knockout";
    },
    any
  >;
}

function LabeledSelect({
  label,
  selectPlaceholder,
  selectItems,
  field,
}: LabeledSelectProps) {
  return (
    <div className="flex items-center justify-between gap-[16px] self-stretch">
      <FormLabel className="w-[82px] flex-shrink-0">{label}</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={selectPlaceholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {selectItems.map((valueNamePair) => (
            <SelectItem key={valueNamePair[0]} value={valueNamePair[0]}>
              {valueNamePair[1]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default LabeledSelect;
