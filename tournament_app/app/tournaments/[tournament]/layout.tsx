"use client";

import React, { use } from "react";
import TournamentHeader from "./TournamentHeader";
import { useFetchTournamentById } from "@/components/api/hooks/useTournaments";
import NavBar from "./NavBar";

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
    <div className="m-10 flex flex-col gap-4">
      <TournamentHeader tournament={data} />
      <div className="flex items-center justify-center">
        <NavBar tournamentId={tournamentId} />
      </div>
      {children}
    </div>
  );
}

export default TournamentLayout;
