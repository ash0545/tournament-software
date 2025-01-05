"use client";

import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

import GoogleSignInButton from "./GoogleSignInButton";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  emailAddress: z.string().email(),
  password: z.string().min(8),
});

function page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };

  return (
    <div className="flex h-screen ">
      <div className="w-2/3  bg-gray-200 h-full"> </div>
      <div className=" h-full w-1/3">
        <div className="flex h-screen items-center justify-center ml-2 mr-2">
          <Form {...form}>
            <form
              action=""
              onSubmit={form.handleSubmit(handleSubmit)}
              className="max-w-xs w-full flex flex-col gap-4 "
            >
              <h1 className="text-center text-3xl font-semibold mb-8">Login</h1>
              <FormField
                control={form.control}
                name="emailAddress"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <span className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="underline text-black font-medium"
                >
                  Create account
                </Link>
              </span>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <span className="flex w-full md:w-60 lg:w-80">
                <Separator className="w-5/12 bg-gray-600 mt-3 mx-2" /> or
                <Separator className="w-5/12 mt-3 pt-px mx-2 bg-gray-600 " />
              </span>
              <GoogleSignInButton />
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default page;
