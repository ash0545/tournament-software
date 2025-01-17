"use client";

import "@/app/globals.css";

import { useState } from "react";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import EventsTable from "./EventsTable";
import CreateTournament from "./TournamentForm";
import { Label } from "@/components/ui/label";

const inter = Inter({ subsets: ["latin"] });
export default function Page() {
  const [event, setEvent] = useState([]);
  return (
    <div className="flex flex-col ml-10 mt-[85px]">
      <Label className={`font-semibold mb-[18px]`} style={{ fontSize: "32px" }}>
        Create Tournament
      </Label>
      <div>
        <CreateTournament event={event} />
      </div>
      <Label className={`font-semibold pt-2.5`} style={{ fontSize: "20px" }}>
        Events
      </Label>
      <div className="max-w-4xl pt-3.5">
        <EventsTable event={event} setEvent={setEvent} />
      </div>
      <div className="pt-3.5">
        <Button form="tournamentform" className="max-w-[90px]" type="submit">
          Submit
        </Button>
      </div>
    </div>
  );
}
