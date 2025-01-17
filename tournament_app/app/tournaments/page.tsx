"use client";

import { Label } from "@/components/ui/label";
import TournamentCard from "./TournamentCard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div className=" m-10">
      <div className="flex flex-row justify-between">
        <Label
          className={`font-semibold mb-[18px]`}
          style={{ fontSize: "32px" }}
        >
          Tournaments
        </Label>
        <Button
          onClick={() => router.push("/tournaments/create")}
          className="max-w-[90px]"
          type="button"
        >
          Create
        </Button>
      </div>
      <TournamentCard />
    </div>
  );
}
