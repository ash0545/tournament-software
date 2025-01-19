import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Tournaments from "./Tournaments";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ searchParams }: PageProps) {
  return (
    <div className=" m-10">
      <div className="flex flex-row justify-between">
        <Label
          className={`font-semibold mb-[18px]`}
          style={{ fontSize: "32px" }}
        >
          Tournaments
        </Label>
        <Button className="max-w-[90px]" type="button">
          <Link href="/tournaments/create">Create</Link>
        </Button>
      </div>
      <Tournaments searchParams={searchParams} />
    </div>
  );
}
