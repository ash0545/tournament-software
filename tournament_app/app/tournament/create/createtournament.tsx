"use client";
import React, { useState } from "react";
import * as z from "zod"; // zod ensures data arrives in satisfactory types/formats
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; // validates data according to 'zod' configuration everytime data updates

// styles
import "@/app/globals.css";

// shadcn components
import {
	Form,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
	FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z
	.object({
		name: z.string().min(1, { message: "Name is required" }),
		description: z
			.string()
			.max(400, {
				message: "Description cannot be more than 400 characters",
			})
			.optional(),
		public: z.boolean(),
		location: z.string().min(1, { message: "Location is required" }),
		startDate: z.date(),
		endDate: z.date(),
	})
	.refine(
		(data) => {
			return data.startDate.getUTCDate() >= new Date().getUTCDate();
		},
		{
			message: "Start date must be from today's date",
			path: ["startDate"],
		}
	)
	.refine(
		(data) => {
			return data.startDate <= data.endDate;
		},
		{
			message: "End date must be on or after start date",
			path: ["endDate"],
		}
	);

export default function CreateTournament({ event }) {
	const [stateStartDate, setStateStartDate] = useState(new Date());
	const [stateEndDate, setStateEndDate] = useState(new Date());

	const ctform = useForm<z.infer<typeof formSchema>>({
		// config object
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			description: "",
			public: false,
			location: "",
		},
	});

	const finale = ({ values }) => {
		let final = { ...values, events: [...event] };
		console.log(final);
	};

	const handleSubmit = (values: z.infer<typeof formSchema>) => {
		finale({ values });
	};

	return (
		<main>
			<Form {...ctform}>
				<form
					id="tournamentform"
					onSubmit={ctform.handleSubmit(handleSubmit)}
				>
					<div className="parent flex justify-between w-[850px] gap-[79px]">
						{/* ctform is an object returned by useForm that creates a form of the schema we define and has an attribute handleSumbmit which accepts a function to execute when submit is clicked */}
						<div className="left-inputs flex flex-col flex-1 gap-[18px]">
							<FormField
								control={ctform.control}
								name="name"
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input
													className="self-stretch"
													placeholder="Name"
													type="text"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									);
								}}
							/>

							<FormField
								control={ctform.control}
								name="description"
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Type your description here"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									);
								}}
							/>

							<FormField
								control={ctform.control}
								name="public"
								render={({ field }) => {
									return (
										<FormItem className="flex items-center">
											<FormLabel>Public</FormLabel>
											<FormControl className="flex items-center">
												<div className="pl-2 pb-2">
													<Switch
														checked={field.value}
														onCheckedChange={
															field.onChange
														}
													/>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									);
								}}
							/>
						</div>
						<div className="right-inputs flex flex-col flex-1 gap-[18px]">
							<FormField
								control={ctform.control}
								name="location"
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel>Location</FormLabel>
											<FormControl>
												<Input
													placeholder="Location"
													type="text"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									);
								}}
							/>

							<FormField
								control={ctform.control}
								name="startDate"
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel>Start Date</FormLabel>
											<FormControl>
												<Input
													{...field}
													value={
														field.value
															?.toISOString()
															.slice(0, 10) || ""
													}
													placeholder="Start Date"
													type="date"
													onChange={(e) => {
														const newDate =
															new Date(
																e.target.value
															);
														setStateStartDate(
															newDate
														);
														field.onChange(newDate);
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									);
								}}
							/>

							<FormField
								control={ctform.control}
								name="endDate"
								render={({ field }) => {
									const formattedDate =
										field.value
											?.toISOString()
											?.slice(0, 10) || "";
									return (
										<FormItem>
											<FormLabel>End Date</FormLabel>
											<FormControl>
												<Input
													{...field}
													value={
														field.value
															?.toISOString()
															.slice(0, 10) || ""
													}
													placeholder="End Date"
													type="date"
													onChange={(e) => {
														const newDate =
															new Date(
																e.target.value
															);
														setStateEndDate(
															newDate
														);
														field.onChange(newDate);
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									);
								}}
							/>
						</div>
					</div>
				</form>
			</Form>
		</main>
	);
}
