"use client";

import React, { useEffect } from "react";
import { toast } from "sonner";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/components/lib/firebase/client-app";
import { useRouter } from "next/navigation";
import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "./login-form";

const formSchema = z.object({
  emailAddress: z.string().email(),
  password: z.string().min(8),
});

function page() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/");
      toast(`Logged in as ${user.displayName}`);
    }
  }, [user, loading, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Tournament Software
        </a>
        <LoginForm />
      </div>
    </div>
  );
}

export default page;
