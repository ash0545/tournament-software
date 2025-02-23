"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormItem,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";

// Refer interfaces defined in respective files for props structure
import LabeledInput from "./labeled-input";
import LabeledSelect from "./labeled-select";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().trim().min(1, "Required"),
  age_restriction: z.coerce
    .number()
    .positive({ message: "Please enter a valid age" }),
  entry_fee: z.coerce
    .number()
    .nonnegative({ message: "Please enter a valid fee" }),
  max_entries: z.coerce
    .number()
    .positive({ message: "Please enter a valid number of entries" }),
  seeding_count: z.coerce
    .number()
    .nonnegative({ message: "Please enter a valid number of seedings" }),
  type_code: z.enum(["single", "double", "team_event"]),
  format_code: z.enum(["round_robin", "knockout"]),
});

function AddEventDialog({ event, setEvent }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age_restriction: 18,
      entry_fee: 0,
      max_entries: 1,
      seeding_count: 16,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setEvent((prevEvent) => [...prevEvent, data]);
    form.reset();
    setDialogOpen(false);
  }

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Add Event</Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col items-start gap-[32px] self-stretch max-w-max">
          <DialogHeader>
            <DialogTitle className="flex">Add Event</DialogTitle>
            <DialogDescription>All fields are mandatory</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form id="eventsForm" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="event-inputs flex items-start gap-[16px] self-stretch max-sm:flex-col">
                <div className="left-inputs flex flex-col items-start gap-[16px] flex-grow flex-shrink-0">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <LabeledInput
                            inputPlaceholder="Name"
                            label="Name"
                            id="nameInput"
                            inputType="text"
                            field={field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="age_restriction"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <LabeledInput
                            inputPlaceholder="Age"
                            label="Age restriction"
                            id="ageRestrictionInput"
                            inputType="number"
                            field={field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="entry_fee"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <LabeledInput
                            inputPlaceholder="0"
                            label="Entry Fee"
                            id="entryFeeInput"
                            inputType="number"
                            field={field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="max_entries"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <LabeledInput
                            inputPlaceholder="1"
                            label="Max. Entries"
                            id="maxEntriesInput"
                            inputType="number"
                            field={field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="right-inputs flex flex-col items-start gap-[16px] flex-grow flex-shrink-0">
                  <FormField
                    control={form.control}
                    name="type_code"
                    render={({ field }) => (
                      <FormItem className="self-stretch">
                        <LabeledSelect
                          label="Type"
                          selectPlaceholder="Event Type"
                          selectItems={[
                            ["single", "Single"],
                            ["double", "Double"],
                            ["team_event", "Team Event"],
                          ]} // refer LabeledSelect's interface in respective file
                          field={field}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="format_code"
                    render={({ field }) => (
                      <FormItem className="self-stretch">
                        <LabeledSelect
                          label="Format"
                          selectPlaceholder="Format Type"
                          selectItems={[
                            ["round_robin", "Round-robin"],
                            ["knockout", "Knockouts"],
                          ]}
                          field={field}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="seeding_count"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <LabeledInput
                            inputPlaceholder="16"
                            label="Number of seedings"
                            id="seedingsInput"
                            inputType="number"
                            field={field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </form>
          </Form>
          <DialogFooter className="flex justify-end items-center gap-[8px] self-stretch">
            <Button form="eventsForm" type="submit">
              Add Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddEventDialog;
