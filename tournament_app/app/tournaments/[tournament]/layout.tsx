"use client";

import React, { use } from "react";
import TournamentHeader from "./TournamentHeader";
import { useFetchTournamentById } from "@/components/api/hooks/useTournaments";

function TournamentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ tournament: string }>;
}) {
  const t = use(params);
  const tournamentId = t.tournament;
  const { data, error, isLoading } = useFetchTournamentById(tournamentId);

  if (isLoading) return <div>Loading... </div>;

  return (
    <div className="m-10">
      <TournamentHeader tournament={data} />
      {children}
    </div>
  );
}

export default TournamentLayout;
