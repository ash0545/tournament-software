"use client";

import { Tournament } from "@/components/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { useRouter } from "next/navigation";

interface TournamentListProps {
  tournaments: Tournament[];
}

function TournamentList({ tournaments }: TournamentListProps) {
  const router = useRouter();

  return (
    <div className="space-y-4">
      {tournaments.map((tournament) => (
        <Card
          key={tournament.tournament_id}
          className="shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out cursor-pointer"
          onClick={() =>
            router.push(`/tournaments/${tournament.tournament_id}`)
          }
        >
          <CardHeader>
            <CardTitle>{tournament.tournament_name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{tournament.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default TournamentList;
