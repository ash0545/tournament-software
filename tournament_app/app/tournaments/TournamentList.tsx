"use client";

import { Tournament } from "@/components/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface TournamentListProps {
  tournaments: Tournament[];
}

function TournamentList({ tournaments }: TournamentListProps) {
  return (
    <div className="space-y-4">
      {tournaments.map((tournament) => (
        <Card key={tournament.tournament_id}>
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
