"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"


import Link from 'next/link'

const formSchema = z.object({
    fullName: z.string().min(5),
    emailAddress: z.string().email(),
    password: z.string().min(8),
    passwordConfirm: z.string()
}).refine( (data) => {
    return data.password === data.passwordConfirm
}, {
    message: "Password does not match",
    path: ["passwordConfirm"]
})


function page() {
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        emailAddress: "",
        fullName: "", 
        password: "",
        passwordConfirm: "",
    }
  });

  const handleSubmit= (values: z.infer<typeof formSchema>) => {
    console.log({values});
  }

  return (
    <div className='flex h-screen '>
        <div className='w-2/3  bg-gray-200 h-full'> </div>
        <div className=' h-full w-1/3'>
            <div className='flex h-screen items-center justify-center ml-2 mr-2'>
                <Form {...form}>
                    <form action="" 
                        onSubmit={form.handleSubmit(handleSubmit)} 
                        className='max-w-xs w-full flex flex-col gap-4 '
                        >
                            <h1 className='text-center text-3xl font-semibold mb-8'>Create Account</h1>
                        <FormField control={form.control} name='fullName' render={({field})=> {
                            return <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input type='name' placeholder='Full Name' {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        }}/>
                        <FormField control={form.control} name='emailAddress' render={({field})=> {
                            return <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type='email' placeholder='Email' {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        }}/>
                        <FormField control={form.control} name='password' render={({field})=> {
                            return <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder='Password' {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        }}/>
                        <FormField control={form.control} name='passwordConfirm' render={({field})=> {
                            return <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder='Confirm Password' {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        }}/>
                        <span className='text-sm text-gray-600'>Already have an account? <Link href="/login" className='underline text-black font-medium'>Login</Link></span>
                        <Button type='submit' className='w-full'>
                            Sign up
                        </Button>
                    </form>
                </Form>
            </div>
            
        </div>
    </div>
  )
}

export default page