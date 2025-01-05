import React from "react";
import { Input } from "../../components/ui/input";
import { ControllerRenderProps } from "react-hook-form";
import { FormLabel } from "@/components/ui/form";

interface LabeledInputProps {
  label: string;
  inputPlaceholder: string;
  inputType: string;
  id: string;
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

function LabeledInput({
  label,
  inputPlaceholder,
  inputType,
  id,
  field,
}: LabeledInputProps) {
  return (
    <div className="flex items-center justify-between gap-[16px] self-stretch">
      <FormLabel htmlFor={id} className="w-[82px]">
        {label}
      </FormLabel>
      <Input
        id={id}
        placeholder={inputPlaceholder}
        type={inputType}
        className="w-fit"
        {...field}
      />
    </div>
  );
}

export default LabeledInput;
