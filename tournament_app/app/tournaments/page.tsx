"use client";

import { use } from "react";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import Tournaments from "./tournaments";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function Page(props: PageProps) {
  const searchParams = use(props.searchParams);

  return (
    <div className=" m-10">
      <div className="flex flex-row justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          Tournaments
        </h1>
        <Button className="max-w-[90px]" type="button">
          <Link href="/tournaments/create">Create</Link>
        </Button>
      </div>
      <Tournaments searchParams={searchParams} />
    </div>
  );
}
