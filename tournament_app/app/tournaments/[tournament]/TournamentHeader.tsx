import { Tournament } from "@/components/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CircleUserRound, Pencil } from "lucide-react";
import React from "react";

function TournamentHeader({ tournament }: { tournament: Tournament }) {
  return (
    <div className="flex justify-between flex-1">
      <div className="flex flex-col">
        <div className="flex gap-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {tournament.tournament_name}
          </h2>
          <Badge variant="outline" className="flex gap-2 max-h-min">
            <CircleUserRound />
            {tournament.is_public ? "Public" : "Private"}
          </Badge>
        </div>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          {tournament.description}
        </p>
      </div>
      <Button variant="secondary">
        <Pencil />
        Edit
      </Button>
    </div>
  );
}

export default TournamentHeader;
